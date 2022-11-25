﻿namespace ModernPantryBackend.Models
{
    public class Pantry : IBaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual IEnumerable<PantryUser> PantryUser { get; set; }
    }
}