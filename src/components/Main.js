var jQuery= require('jquery');
var $= jQuery;
window.jQuery= jQuery;
//import 'normalize.css';
import '../../node_modules/semantic-ui/dist/semantic.min.css';
import 'styles/App.scss';
require('../../node_modules/semantic-ui/dist/semantic.min.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var React = require('react');

var LoginForm = React.createClass({
    mixins: [LinkedStateMixin],
    handleAction1: function(e){
        e.preventDefault();
        console.log($('#LoginForm').form('get value', 'question1'));
        console.log(this.state.question1);
        if($('#LoginForm.error').length > 0){
            return;
        }
        if(this.state.isRegistering) {
            var data={
                username: this.state.username,
                password: this.state.password,
                question1: $("#Q1 option:selected").text(),
                question2: $("#Q2 option:selected").text(),
                question3: $("#Q3 option:selected").text(),
                answer1: this.state.answer1,
                answer2: this.state.answer2,
                answer3: this.state.answer3
            };
            console.log(data);
            $.ajax({
                url:'http://localhost:6060/account/',
                method: 'PUT',
                dataType:'json',
                contentType:'application/json',
                data: JSON.stringify(data),
                error: function(xhr, status, error){
                    $("#RegistrationSuccess").addClass("hidden");
                    $("#RegistrationFailure").removeClass("hidden");
                    $("#LoginSuccess").addClass("hidden");
                    $("#LoginFailure").addClass("hidden");
                    console.error(error)
                }.bind(this),
                success:function(data, status, xhr){
                    $("#RegistrationSuccess").removeClass("hidden");
                    $("#RegistrationFailure").addClass("hidden");
                    $("#LoginSuccess").addClass("hidden");
                    $("#LoginFailure").addClass("hidden");
                    console.log("Registration successful");
                }.bind(this)
            });

        }else{
            if(this.state.isLogin){
                var data={
                    username: this.state.username,
                    password: this.state.password
                };
                $.ajax({
                   url:'http://localhost:6060/account/',
                   method: 'POST',
                   dataType:'json',
                   contentType:'application/json',
                   data: JSON.stringify(data),
                   error: function(xhr, status, error){
                        $("#LoginSuccess").addClass("hidden");
                        $("#LoginFailure").removeClass("hidden");
                    console.error(error)
                   }.bind(this),
                   success:function(data, status, xhr){
                        $("#LoginSuccess").removeClass("hidden");
                        $("#LoginFailure").addClass("hidden");
                        $("#RegistrationFailure").addClass("hidden");
                        $("#RegistrationSuccess").addClass("hidden");
                    console.log("Login successful");
                    if(this.state.saveDevice) {
                        document.cookie = JSON.stringify(data);
                    }
                   }.bind(this)
                });
            }

        }
        return false;
    },
    handleAction2: function(){
        if(!this.state.isRegistering) {
            this.state.isRegistering = true;
            this.state.isLogin = false;
            $('.register').show();
            $('.login').hide();
            $('#action1').text('Submit');
            $('#action2').text('Cancel');

        }else{
            this.state.isRegistering = false;
            this.state.isLogin = true;
            $('.register').hide();
            $('.login').show();
            $('#action1').text('Login');
            $('#action2').text('Register');
        }
        this.configureValidation();
    },
    configureValidation:function(){
        if (this.state.isLogin) {
            $('.ui.form').form({
                fields: {
                    username: {
                        identifier: 'username',
                        rules: [
                            {
                                type: 'minLength[6]',
                                prompt: 'Username must be at least 6 characters'
                            },
                            {
                                type: 'empty',
                                prompt: 'Must enter a username'
                            },
                            {
                                type: 'email',
                                prompt: 'Username must be an email'
                            }

                        ]
                    },
                    password: {
                        identifier: 'password',
                        rules: [
                            {
                                type: 'minLength[6]',
                                prompt: 'Password must be at least 6 characters'
                            },
                            {
                                type: 'empty',
                                prompt: 'Must enter a Password'
                            }
                        ]
                    }
                }
            });
        } else {
            $('.ui.form').form({
                fields: {
                    username: {
                        identifier : 'username',
                        rules: [
                            {
                                type   : 'minLength[6]',
                                prompt : 'Username must be at least 6 characters'
                            },
                            {
                                type   : 'empty',
                                prompt : 'Must enter a username'
                            },
                            {
                                type   : 'email',
                                prompt : 'Username must be an email'
                            }

                        ]
                    },
                    password: {
                        identifier : 'password',
                        rules: [
                            {
                                type   : 'minLength[6]',
                                prompt : 'Password must be at least 6 characters'
                            },
                            {
                                type   : 'empty',
                                prompt : 'Must enter a Password'
                            }
                        ]
                    },
                    confirmPassword: {
                        identifier : 'confirmPassword',
                        rules: [
                            {
                                type   : 'minLength[6]',
                                prompt : 'Password must be at least 6 characters'
                            },
                            {
                                type   : 'empty',
                                prompt : 'Must enter a confirmation password'
                            },
                            {
                                type   : 'match[password]',
                                prompt : 'Must password and confirmation password must match'
                            }
                        ]
                    },
                    question1: {
                        identifier : 'question1',
                        rules: [
                            {
                                type   : 'minLength[1]',
                                prompt : 'Must select recovery question 1'
                            }
                        ]
                    },
                    question2: {
                        identifier : 'question2',
                        rules: [
                            {
                                type   : 'minLength[1]',
                                prompt : 'Must select recovery question 2'
                            }
                        ]
                    },
                    question3: {
                        identifier : 'question3',
                        rules: [
                            {
                                type   : 'minLength[1]',
                                prompt : 'Must select recovery question 3'
                            }
                        ]
                    },
                    answer1: {
                        identifier : 'answer1',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Must select recovery answer 1'
                            }
                        ]
                    },
                    answer2: {
                        identifier : 'answer2',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Must select recovery answer 2'
                            }
                        ]
                    },
                    answer3: {
                        identifier : 'answer3',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : 'Must select recovery answer 3'
                            }
                        ]
                    }

                }
            });
        }
    },
    componentDidMount:function(){
        //Configure Default State
        $('.ui.dropdown').dropdown()
        $('.ui.checkbox').checkbox()
        $('.message .close')
            .on('click', function() {
                $(this)
                    .closest('.message')
                    .transition('fade')
                ;
            })
        ;
        $('.register').hide()
        this.configureValidation();


    },
    getInitialState: function(){
        return {
            username:"",
            password: "",
            saveDevice: false,
            confirmPassword:"",
            question1:"",
            question2: "",
            question3: "",
            answer1: "",
            answer2: "",
            answer3: "",
            isLogin: true,
            isRegistering: false
        }

    },
    render: function(){
        return(
            <div className="ui one column centered grid container">
                <div className="one column centered row">
                    <div className="column">
                        <h1 className="ui header">Account</h1>
                        <div id="RegistrationSuccess" className="ui positive message transition hidden">
                            <i className="close icon"></i>
                            <div className="header">
                                Registration Success!
                            </div>
                            <p>You are now a full fledged user of nothing in particular.</p>
                        </div>
                        <div id="RegistrationFailure" className="ui negative message transition  hidden">
                            <i className="close icon"></i>
                            <div className="header">
                                Registration Failed!
                            </div>
                            <p>I'm not sure what you screwed up but it has to be your fault.</p>
                        </div>
                        <div id="LoginSuccess" className="ui positive message transition hidden">
                            <i className="close icon"></i>
                            <div className="header">
                                Login Success!
                            </div>
                            <p>You are now free to do whatever.</p>
                        </div>
                        <div id="LoginFailure" className="ui negative message transition  hidden">
                            <i className="close icon"></i>
                            <div className="header">
                                Login Failed!
                            </div>
                            <p>Please correct your username and password.</p>
                        </div>
                        <div id="LoginForm" className="ui form segment">
                            <div className="ui equal width grid container stackable" >
                                <div className="column">
                                    <div className="ui input icon">
                                        <input type="text" placeholder="Username" name="username" valueLink={this.linkState('username')} />
                                        <i className="user icon"></i>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="ui input icon">
                                        <input type="password" placeholder="Password" name="password" valueLink={this.linkState('password')} />
                                        <i className="privacy icon"></i>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="ui checkbox">
                                        <label>Save login on this machine?</label>
                                        <input type="checkbox" checkedLink={this.linkState('saveDevice')} name="device"/>
                                    </div>
                                </div>
                                <div className="column register">
                                    <div className="ui input icon">
                                        <input type="password" placeholder=" Confirm Password" name="confirmPassword" valueLink={this.linkState('confirmPassword')} />
                                        <i className="privacy icon"></i>
                                    </div>
                                </div>
                                <div className="column register">
                                    <select id="Q1" name="question1" className="ui dropdown"  valueLink={this.linkState('question1')}>
                                        <option value="">Security Question 1</option>
                                        <option value="What's you Mother's maiden name?">What's you Mother's maiden name?</option>
                                        <option value="What's your high school mascot?">What's your high school mascot?</option>
                                        <option value="What's your favorite color?">What's your favorite color?</option>
                                    </select>
                                </div>
                                <div className="column register">
                                    <div className="ui input icon">
                                        <input type="text" placeholder="Answer 1" name="answer1" valueLink={this.linkState('answer1')} />
                                    </div>
                                </div>
                                <div className="column register">
                                    <select id="Q2" name="question2" className="ui dropdown" valueLink={this.linkState('question2')}>
                                        <option value="">Security Question 2</option>
                                        <option value="What's your eye color?">What's your eye color?</option>
                                        <option value="Who's your favorite relative?">Who's your favorite relative?</option>
                                        <option value="How many sister's do you have?">How many sister's do you have?</option>
                                    </select>
                                </div>
                                <div className="column register">
                                    <div className="ui input icon">
                                        <input type="text" placeholder="Answer 2" name="answer2" valueLink={this.linkState('answer2')} />
                                    </div>
                                </div>
                                <div className="column register">
                                    <select id="Q3" name="question3" className="ui dropdown" valueLink={this.linkState('question3')}>
                                        <option value="">Security Question 3</option>
                                        <option value="What street did you grow up on?">What street did you grow up on?</option>
                                        <option value="Are you still Jenny from the block?">Are you still Jenny from the block?</option>
                                        <option value="What is your favorite song?">What is your favorite song?</option>
                                    </select>
                                </div>
                                <div className="column register">
                                    <div className="ui input icon">
                                        <input type="text" placeholder="Answer 3" name="answer3" valueLink={this.linkState('answer3')} />
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="ui buttons pill">
                                        <div id="action1" className="ui button submit" onClick={this.handleAction1}>Login</div>
                                        <div className="or"></div>
                                        <div id="action2" className="ui button" onClick={this.handleAction2}>Register</div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="ui error message">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports=LoginForm