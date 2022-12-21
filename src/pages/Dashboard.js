import * as React from 'react'
import { Component } from 'react'
import Drawer from '../components/Drawer'
import emailjs from "emailjs-com";
import { Grid, CardActionArea, CardMedia, Typography, CardActions, Button, Card, CardContent, TextField } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import postService from '../services/post-service';
import Transitions from '../components/Transition';
import Share from '../components/Share'

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
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
                      <Share></Share>
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
            </div>
          </Transitions>
        </>
      );
  }
}