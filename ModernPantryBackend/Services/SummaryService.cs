﻿using ModernPantryBackend.Models;

namespace ModernPantryBackend.Services
{
    public class SummaryService : ISummaryService
    {
        private readonly IPantryRepository _pantryRepository;
        private readonly IHelperService _helperService;
        private readonly IBaseRepository<Category> _categoryRepository;
        private readonly IProductRepository _productRepository;

        public SummaryService(IPantryService pantryService, IHelperService helperService, IBaseRepository<Category> categoryRepository, IPantryRepository pantryRepository, IProductRepository productRepository)
        {
            _helperService = helperService;
            _categoryRepository = categoryRepository;
            _pantryRepository = pantryRepository;
            _productRepository = productRepository;
        }

        public async Task<ServiceResponse> GetPantrySummary(int pantryId)
        {
            var pantry = (await _pantryRepository.FindByConditions(p => p.Id == pantryId)).FirstOrDefault();
            if(pantry == null)
            {
                return ServiceResponse.Error("Pantry not found.");
            }

            if(!(await _helperService.GetPantryUserPair(pantryId, false)).SuccessStatus)
            {
                return ServiceResponse.Error("User is not a member of this pantry.");
            }

            Summary summary = new();
            summary.TotalItemCount = pantry.Products.Count();
            summary.PantryAge = DateTime.Now - pantry.CreationDate;

            var products = await _productRepository.FindByConditions(p => p.PantryId == pantryId, true);
            var categories = await _categoryRepository.FindAll();

            Dictionary<Unit, float> totalQuantityByUnit = new();
            for (int i = 0; i < Enum.GetValues(typeof(Unit)).Length; i++)
            {
                totalQuantityByUnit.Add((Unit)i, products.Where(p => !p.IsDeleted && p.Unit == (Unit)i).Sum(p => p.Amount));
            }

            foreach (Category category in categories)
            {
                Dictionary<Unit, float> AmountPerUnit = new();
                Dictionary<Unit, float> AverageMonthlyConsumption = new();
                var productsInCategory = products.Where(p => p.CategoryProduct.Any(cp => cp.Category == category) && !p.IsDeleted);
                var deletedProductsInCategory = products.Where(p => p.CategoryProduct.Any(cp => cp.Category == category) && p.IsDeleted);
                for (int i = 0; i < Enum.GetValues(typeof(Unit)).Length; i++)
                {
                    var pantryAgeMonths = (int)Math.Ceiling(summary.PantryAge.Days / 30.0);
                    pantryAgeMonths = pantryAgeMonths < 1 ? 1 : pantryAgeMonths;
                    AmountPerUnit.Add((Unit)i, productsInCategory.Where(p => p.Unit == (Unit)i).Select(p => p.Amount).Sum());
                    AverageMonthlyConsumption.Add((Unit)i, (float)deletedProductsInCategory
                        .Where(p => p.Unit == (Unit)i).Select(p => p.Amount).Sum() / pantryAgeMonths);
                }

                int CurrentItemCount = products.Where(p => p.CategoryProduct.Any(c => c.Category == category)).Count();
                summary.CategorySummaries.Add(new CategorySummary
                {
                    CategoryName = category.Name,
                    CurrentItemCount = CurrentItemCount,
                    AmountPerUnit = AmountPerUnit,
                    AverageMonthlyConsumption = AverageMonthlyConsumption,
                });
            }
            summary.TotalQuantityByUnit = totalQuantityByUnit;
            return ServiceResponse<Summary>.Success(summary, "Summary retrieved.");
        }
    }
}
