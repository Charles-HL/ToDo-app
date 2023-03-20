"use strict";(self.webpackChunktodo_app=self.webpackChunktodo_app||[]).push([[975],{5975:(j,u,s)=>{s.r(u),s.d(u,{LoginModule:()=>Y});var g=s(6895),c=s(9197),n=s(4006),t=s(4650),f=s(3620),x=s(6570),m=s(9549),d=s(4859),l=s(3546),p=s(4144),_=s(4463);function h(o,e){1&o&&(t.TgZ(0,"mat-card-title",4)(1,"h2"),t._uU(2),t.ALo(3,"translate"),t.qZA()()),2&o&&(t.xp6(2),t.Oqu(t.lcZ(3,1,"Login")))}function C(o,e){1&o&&(t.TgZ(0,"mat-card-title",4)(1,"h2"),t._uU(2),t.ALo(3,"translate"),t.qZA()()),2&o&&(t.xp6(2),t.Oqu(t.lcZ(3,1,"User creation")))}function U(o,e){1&o&&(t.TgZ(0,"span"),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&o&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"Username is required.")))}function Z(o,e){if(1&o&&(t.TgZ(0,"mat-error"),t.YNc(1,U,3,3,"span",3),t.qZA()),2&o){const r=t.oxw(2);t.xp6(1),t.Q6J("ngIf",null==r.loginForm.controls.username||null==r.loginForm.controls.username.errors?null:r.loginForm.controls.username.errors.required)}}function w(o,e){1&o&&(t.TgZ(0,"span"),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&o&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"Password is required.")))}function L(o,e){if(1&o&&(t.TgZ(0,"mat-error"),t.YNc(1,w,3,3,"span",3),t.qZA()),2&o){const r=t.oxw(2);t.xp6(1),t.Q6J("ngIf",null==r.loginForm.controls.password.errors?null:r.loginForm.controls.password.errors.required)}}function F(o,e){if(1&o&&(t.TgZ(0,"mat-error")(1,"span"),t._uU(2),t.ALo(3,"translate"),t.qZA()()),2&o){const r=t.oxw(2);t.xp6(2),t.Oqu(t.lcZ(3,1,r.loginErrorMsg))}}function T(o,e){if(1&o){const r=t.EpF();t.TgZ(0,"mat-card-content")(1,"form",5),t.NdJ("ngSubmit",function(){t.CHM(r);const i=t.oxw();return t.KtG(i.onSubmit())}),t.TgZ(2,"mat-form-field"),t._UZ(3,"input",6),t.ALo(4,"translate"),t.YNc(5,Z,2,1,"mat-error",3),t.qZA(),t.TgZ(6,"mat-form-field"),t._UZ(7,"input",7),t.ALo(8,"translate"),t.YNc(9,L,2,1,"mat-error",3),t.qZA(),t.TgZ(10,"button",8),t._uU(11),t.ALo(12,"translate"),t.qZA(),t.YNc(13,F,4,3,"mat-error",3),t.TgZ(14,"button",9),t.NdJ("click",function(){t.CHM(r);const i=t.oxw();return t.KtG(i.onCreateUser())}),t.TgZ(15,"div"),t._uU(16),t.ALo(17,"translate"),t.qZA()()()()}if(2&o){const r=t.oxw();t.xp6(1),t.Q6J("formGroup",r.loginForm),t.xp6(2),t.s9C("placeholder",t.lcZ(4,9,"Username")),t.xp6(2),t.Q6J("ngIf",r.loginForm.controls.username.invalid&&(r.loginForm.controls.username.dirty||r.loginForm.controls.username.touched)),t.xp6(2),t.s9C("placeholder",t.lcZ(8,11,"Password")),t.xp6(2),t.Q6J("ngIf",r.loginForm.controls.password.invalid&&(r.loginForm.controls.password.dirty||r.loginForm.controls.password.touched)),t.xp6(1),t.Q6J("disabled",r.loginForm.invalid),t.xp6(1),t.Oqu(t.lcZ(12,13,"Login")),t.xp6(2),t.Q6J("ngIf",r.isloginError),t.xp6(3),t.Oqu(t.lcZ(17,15,"Create user"))}}function q(o,e){1&o&&(t.TgZ(0,"span"),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&o&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"Username is required.")))}function A(o,e){if(1&o&&(t.TgZ(0,"mat-error"),t.YNc(1,q,3,3,"span",3),t.qZA()),2&o){const r=t.oxw(2);t.xp6(1),t.Q6J("ngIf",null==r.createUserForm.controls.username||null==r.createUserForm.controls.username.errors?null:r.createUserForm.controls.username.errors.required)}}function P(o,e){1&o&&(t.TgZ(0,"span"),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&o&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"Password is required.")))}function v(o,e){if(1&o&&(t.TgZ(0,"mat-error"),t.YNc(1,P,3,3,"span",3),t.qZA()),2&o){const r=t.oxw(2);t.xp6(1),t.Q6J("ngIf",null==r.createUserForm.controls.password||null==r.createUserForm.controls.password.errors?null:r.createUserForm.controls.password.errors.required)}}function b(o,e){1&o&&(t.TgZ(0,"span"),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&o&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"Confirm Password is required.")))}function I(o,e){1&o&&(t.TgZ(0,"span"),t._uU(1),t.ALo(2,"translate"),t.qZA()),2&o&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"Passwords do not match.")))}function M(o,e){if(1&o&&(t.TgZ(0,"mat-error"),t.YNc(1,b,3,3,"span",3),t.YNc(2,I,3,3,"span",3),t.qZA()),2&o){const r=t.oxw(2);t.xp6(1),t.Q6J("ngIf",null==r.createUserForm.controls.confirmPassword||null==r.createUserForm.controls.confirmPassword.errors?null:r.createUserForm.controls.confirmPassword.errors.required),t.xp6(1),t.Q6J("ngIf",null==r.createUserForm.controls.confirmPassword||null==r.createUserForm.controls.confirmPassword.errors?null:r.createUserForm.controls.confirmPassword.errors.passwordMismatch)}}function O(o,e){if(1&o&&(t.TgZ(0,"mat-error")(1,"span"),t._uU(2),t.ALo(3,"translate"),t.qZA()()),2&o){const r=t.oxw(2);t.xp6(2),t.Oqu(t.lcZ(3,1,r.createUserErrorMsg))}}function N(o,e){if(1&o){const r=t.EpF();t.TgZ(0,"mat-card-content")(1,"form",5),t.NdJ("ngSubmit",function(){t.CHM(r);const i=t.oxw();return t.KtG(i.onCreateUserSubmit())}),t.TgZ(2,"mat-form-field"),t._UZ(3,"input",10),t.ALo(4,"translate"),t.YNc(5,A,2,1,"mat-error",3),t.qZA(),t.TgZ(6,"mat-form-field"),t._UZ(7,"input",11),t.ALo(8,"translate"),t.YNc(9,v,2,1,"mat-error",3),t.qZA(),t.TgZ(10,"mat-form-field"),t._UZ(11,"input",12),t.ALo(12,"translate"),t.YNc(13,M,3,2,"mat-error",3),t.qZA(),t.TgZ(14,"button",13),t._uU(15),t.ALo(16,"translate"),t.qZA(),t.TgZ(17,"button",14),t.NdJ("click",function(){t.CHM(r);const i=t.oxw();return t.KtG(i.onCancelCreateUser())}),t._uU(18),t.ALo(19,"translate"),t.qZA(),t.YNc(20,O,4,3,"mat-error",3),t.qZA()()}if(2&o){const r=t.oxw();t.xp6(1),t.Q6J("formGroup",r.createUserForm),t.xp6(2),t.s9C("placeholder",t.lcZ(4,11,"Username")),t.xp6(2),t.Q6J("ngIf",r.createUserForm.controls.username.invalid&&(r.createUserForm.controls.username.dirty||r.createUserForm.controls.username.touched)),t.xp6(2),t.s9C("placeholder",t.lcZ(8,13,"Password")),t.xp6(2),t.Q6J("ngIf",r.createUserForm.controls.password.invalid&&(r.createUserForm.controls.password.dirty||r.createUserForm.controls.password.touched)),t.xp6(2),t.s9C("placeholder",t.lcZ(12,15,"Confirm Password")),t.xp6(2),t.Q6J("ngIf",r.createUserForm.controls.confirmPassword.invalid&&(r.createUserForm.controls.confirmPassword.dirty||r.createUserForm.controls.confirmPassword.touched)),t.xp6(1),t.Q6J("disabled",r.createUserForm.invalid),t.xp6(1),t.Oqu(t.lcZ(16,17,"Create User")),t.xp6(3),t.Oqu(t.lcZ(19,19,"Cancel")),t.xp6(2),t.Q6J("ngIf",r.isCreateUserError)}}const y=[{path:"",component:(()=>{class o{constructor(r,a,i,S){this.authService=r,this.router=a,this.route=i,this.apiService=S,this.loginForm=new n.cw({username:new n.NI("",n.kI.required),password:new n.NI("",n.kI.required)}),this.createUserForm=new n.cw({username:new n.NI("",n.kI.required),password:new n.NI("",n.kI.required),confirmPassword:new n.NI("",[n.kI.required,this.matchPasswords.bind(this)])}),this.isCreatingUser=!1,this.isloginError=!1,this.loginErrorMsg="",this.isCreateUserError=!1,this.createUserErrorMsg="",this.routeSub=this.route.queryParams.subscribe(E=>{this.returnUrl=E.returnUrl})}ngOnInit(){}ngOnDestroy(){this.routeSub.unsubscribe()}getReturnPage(){return this.returnUrl?this.returnUrl:"/"}matchPasswords(r){const a=r.parent?.get("password"),i=r.parent?.get("confirmPassword");return console.log("matchPasswords",r,a,i),a&&i&&a.value!==i.value?{passwordMismatch:!0}:null}onSubmit(){this.loginForm.valid&&this.authService.login(this.loginForm.value.username,this.loginForm.value.password).subscribe(r=>{1==r.success?(this.isloginError=!1,console.log("User is logged in"),this.authService.emitIsLoggedSubject(!0),console.debug("Navigating to "+this.getReturnPage()),this.router.navigate([this.getReturnPage()])):(this.isloginError=!0,this.loginErrorMsg=r.message)})}onCreateUser(){this.isCreatingUser=!0}onCreateUserSubmit(){this.createUserForm.valid&&this.apiService.postSignup({username:this.createUserForm.value.username,password:this.createUserForm.value.password}).subscribe(r=>{1==r.success?(this.isCreateUserError=!1,this.isCreatingUser=!1):(this.isCreateUserError=!0,this.createUserErrorMsg=r.message)})}onCancelCreateUser(){this.isCreatingUser=!1}}return o.\u0275fac=function(r){return new(r||o)(t.Y36(f.e),t.Y36(c.F0),t.Y36(c.gz),t.Y36(x.s))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-login"]],decls:6,vars:4,consts:[[1,"login-container"],[1,"login-card"],["class","login-title themed-font-color",4,"ngIf"],[4,"ngIf"],[1,"login-title","themed-font-color"],[1,"login-form",3,"formGroup","ngSubmit"],["matInput","","formControlName","username","type","text","required","","autocomplete","username",3,"placeholder"],["matInput","","formControlName","password","type","password","required","","autocomplete","current-password",3,"placeholder"],["mat-raised-button","","color","primary","type","submit",1,"login-button",3,"disabled"],["mat-button","",1,"create-user-button",3,"click"],["matInput","","formControlName","username","type","text","required","",3,"placeholder"],["matInput","","formControlName","password","type","password","required","",3,"placeholder"],["matInput","","formControlName","confirmPassword","type","password","required","",3,"placeholder"],["mat-raised-button","","color","primary","type","submit",1,"create-user-button","login-button",3,"disabled"],["mat-raised-button","","color","warn","type","button",1,"cancel-button","login-button",3,"click"]],template:function(r,a){1&r&&(t.TgZ(0,"div",0)(1,"mat-card",1),t.YNc(2,h,4,3,"mat-card-title",2),t.YNc(3,C,4,3,"mat-card-title",2),t.YNc(4,T,18,17,"mat-card-content",3),t.YNc(5,N,21,21,"mat-card-content",3),t.qZA()()),2&r&&(t.xp6(2),t.Q6J("ngIf",!a.isCreatingUser),t.xp6(1),t.Q6J("ngIf",a.isCreatingUser),t.xp6(1),t.Q6J("ngIf",!a.isCreatingUser),t.xp6(1),t.Q6J("ngIf",a.isCreatingUser))},dependencies:[g.O5,m.KE,m.TO,d.lW,l.a8,l.dn,l.n5,p.Nt,n._Y,n.Fj,n.JJ,n.JL,n.Q7,n.sg,n.u,_.X$],styles:[".login-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;align-content:center;flex-direction:column;height:100%}.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]{width:40em;height:35em;display:flex;justify-content:center}.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]   .login-title[_ngcontent-%COMP%]{text-align:center;margin:1em}.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%}.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%;max-width:400px;margin-bottom:20px}.login-container[_ngcontent-%COMP%]   .login-card[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   .login-button[_ngcontent-%COMP%]{width:100%;max-width:400px;margin-bottom:20px}"]}),o})()}];let J=(()=>{class o{}return o.\u0275fac=function(r){return new(r||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[c.Bz.forChild(y),c.Bz]}),o})();var Q=s(7392);let Y=(()=>{class o{}return o.\u0275fac=function(r){return new(r||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[g.ez,J,m.lN,d.ot,l.QW,Q.Ps,_.aw.forChild({extend:!0}),p.c,n.UX]}),o})()}}]);