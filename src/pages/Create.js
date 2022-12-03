import { Button, Card, CardHeader, CardContent, TextField, Grid } from '@mui/material';
import React, { Component } from 'react'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ButtonCustom from '../components/ButtonCustom'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import Drawer from '../components/Drawer'
import postService from '../services/post-service';
import logger from '../logger/logger';
import lang from 'i18next'
import Transitions from '../components/Transition'

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.handleCreatePost = this.handleCreatePost.bind(this);
        this.onChangeSaveFile = this.onChangeSaveFile.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onClickSelectFile = this.onClickSelectFile.bind(this);

        this.state = {
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
            logger.log("Add.js")
            logger.log(this.state.title)
            logger.log(this.state.description)
            logger.log(this.state.file)
            logger.log(this.state.fileName)

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
                    logger.log("Create.js")
                    logger.error(error)
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
        if (this.state.uploadError) {
            return (
                <>
                    <Drawer></Drawer>
                    <Transitions>
                        <div className="px-4 pb-2 pt-4 lg:mx-auto md:mx-auto ml-14 sm:max-w-xl lg:max-w-screen-xl md:px-24 lg:px-8">
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            style={{ minHeight: '80vh' }}
                        >
                            <Grid item xs={3}>
                                <div>
                                <Card style={{marginTop: '20px' }} elevation={5}>
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
                                </div>
                            </Grid>
                        </Grid>
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
                            style={{ minHeight: '100vh' }}
                        >
                            <Grid item xs={3}>
                                <Card style={{ width: '614px', marginTop: '20px' }} elevation={5}>
                                    <CardHeader
                                        title='New title'
                                    />
                                    <CardContent>
                                        <ButtonCustom link="/Profile" name="Profile" icon={<AccountBoxOutlinedIcon />} />
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