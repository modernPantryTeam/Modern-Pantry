import * as React from 'react'
import { Component } from 'react'
import Drawer from '../components/Drawer'
import emailjs from "emailjs-com";
import { Grid, CardActionArea, CardMedia, Typography, CardActions, Button, Card, CardContent, TextField } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import postService from '../services/post-service';
import Transitions from '../components/Transition';

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.popup = this.popup.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCreatePost = this.handleCreatePost.bind(this);
    this.onChangeSaveFile = this.onChangeSaveFile.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onClickSelectFile = this.onClickSelectFile.bind(this);

    this.state = {
      send: false,
      file: {},
      fileName: "",
      title: "",
      description: "",
      titleError: false,
      descriptionError: false,
      fileError: false,
      uploadError: true,
      fileSubmitError: true,
      message: ""
    }

    this.fileInputRef = React.createRef();
  }

  popup(e) {
    e.preventDefault();
    emailjs.popup(e.target)
      .then((result) => {
      }, (error) => {
      });
    e.target.reset()
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      send: true
    });
  }

  onClickSelectFile(e) {
    e.preventDefault();
    this.fileInputRef.current.click();
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeSaveFile(e) {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.files[0].name,
      fileSubmitError: false
    });
  }

  handleCreatePost(e) {
    e.preventDefault();
    this.setState({
      titleError: false,
      descriptionError: false,
      message: ""
    });

    if (this.state.title === "") {
      this.setState({
        titleError: true
      });
    }
    if (this.state.description === "") {
      this.setState({
        descriptionError: true
      });
    }
    if (this.state.fileName === "") {
      this.setState({
        fileError: true
      });
    }

    if (this.state.title && this.state.description && this.state.fileName) {

      postService.createPost(
        this.state.title,
        this.state.description,
        this.state.file,
        this.state.fileName
      ).then(
        () => {
          this.setState({
            uploadError: false
          });
        },
        error => {
          const resMessage = (
            error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            uploadError: true,
            message: resMessage
          });
        }
      );

    }
  }


  render() {
    if (!this.state.send) {
      return (
        <>
          <Drawer></Drawer>
          <Transitions>
            <div class="container">
              <div class="pantry-result">
                <div id="pantry" style={{ paddingLeft: "56px" }}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image="https://i.imgur.com/LeAXVOG.png"
                        alt="pantry image"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Beach House
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Ut dictum laoreet libero, eu facilisis erat fringilla rutrum.
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                      >
                        <Button size="small" color="inherit" href="/pantry">
                          Enter
                        </Button>
                      </Grid>
                      <Button style={{ justifyContent: 'flex-end' }} size="small" color="inherit" href="#">
                        Share
                      </Button>
                    </CardActions>
                  </Card>

                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image="https://i.imgur.com/LeAXVOG.png"
                        alt="pantry image"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Miami
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Ut dictum laoreet libero, eu facilisis erat fringilla rutrum.
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                      >
                        <Button size="small" color="inherit" href="#">
                          Enter
                        </Button>
                      </Grid>
                      <Button style={{ justifyContent: 'flex-end' }} size="small" color="inherit" href="/miami">
                        Share
                      </Button>
                    </CardActions>
                  </Card>

                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image="https://i.imgur.com/LeAXVOG.png"
                        alt="pantry image"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Los Angeles
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Ut dictum laoreet libero, eu facilisis erat fringilla rutrum.
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                      >
                        <Button size="small" color="inherit" href="#">
                          Enter
                        </Button>
                      </Grid>
                      <Button style={{ justifyContent: 'flex-end' }} size="small" color="inherit" href="#">
                        Share
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              </div>
              <button
                type="button"
                className={`bg-black text-white w-2 rounded h-8 font-bold`}
                onClick={this.handleClick}
              >
                {("Create")}
              </button>
            </div>
          </Transitions>
        </>
      );
    } else {
      return (
        <>
          <Drawer></Drawer>
          <Transitions>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: '80vh' }}
            >
              <Grid item xs={3}>
                <Card style={{ width: '40rem', marginTop: '20px' }} elevation={5}>
                  <p className="pt-4 pl-2 text-medium">
                    Create your pantry
                  </p>
                  <CardContent>
                    {this.state.message && (
                      <p className="mb-4 text-xs text-red-primary">
                        {this.state.message}
                      </p>
                    )}
                    <form noValidate autoComplete="off" onSubmit={this.handleCreatePost}>


                      {this.state.fileSubmitError && (
                        <Button
                          style={{
                            color: this.state.fileError ? '#ffffff' : 'white',
                            borderColor: this.state.fileError ? '#d32f2f' : 'white'
                          }}
                          variant="text"
                          startIcon={<AddPhotoAlternateOutlinedIcon />}
                          onClick={this.onClickSelectFile}
                        >
                          {('Upload image')}
                        </Button>
                      )}

                      {!this.state.fileSubmitError && (
                        <Button
                          disabled
                          style={{ color: 'white' }}
                          variant="text"
                          startIcon={<AddPhotoAlternateOutlinedIcon />}
                          onClick={this.onClickSelectFile}
                        >
                          {('Upload successful')}
                        </Button>
                      )}

                      <input
                        hidden
                        type="file"
                        style={{ display: 'none' }}
                        ref={this.fileInputRef}
                        accept="image/*"
                        onChange={this.onChangeSaveFile}
                      />

                      <TextField
                        onChange={this.onChangeTitle}
                        style={{ marginTop: '10px' }}
                        label={('Pantry Name')}
                        variant="outlined"
                        fullWidth
                        required
                        color="secondary"
                        error={this.state.titleError}
                      />

                      <TextField
                        onChange={this.onChangeDescription}
                        label={('Description')}
                        style={{ marginTop: '10px' }}
                        variant="outlined"
                        fullWidth
                        required
                        multiline
                        color="secondary"
                        rows={4}
                        error={this.state.descriptionError}
                      />

                      <Button
                        style={{ marginTop: '24px', color: 'white' }}
                        type="submit"
                        variant="text"
                        color="secondary"
                        endIcon={<SendOutlinedIcon />}>
                        {('Create')}
                      </Button>

                    </form>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Transitions>
        </>
      );
    }
  }
}