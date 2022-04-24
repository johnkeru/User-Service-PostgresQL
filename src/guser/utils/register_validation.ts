export function register_validation(username:string, email:string, password: string){
    const username_is_empty = {field: 'username',msg: 'username is empty!'}
    const username_weak_input = {field: 'username',msg: 'username is too short!'}

    const email_is_empty = {field: 'email',msg: 'email is empty!'}
    const email_weak_input = {field: 'email',msg: 'email is too short!'}
    const email_invalid = {field: 'email',msg: 'email is invalid!'}

    const password_is_empty = {field: 'password',msg: 'password is empty!'}
    const password_weak_input = {field: 'password',msg: 'password is too short!'}

    if(!username) return username_is_empty
    if(username.length < 3) return username_weak_input
    if(!email) return email_is_empty
    if(email.length < 3) return email_weak_input
    if(!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) return email_invalid
    if(!password) return password_is_empty
    if(password.length < 3) return password_weak_input
    return {field: null, msg: null}
}