export default class Factory {

    static standardUser(typeUser, userEmail, userPassword, admin = true) {
        
        switch (typeUser) {

            case 'valid':
                return { 
                    "email": "fulano@qa.com",
                    "password": "teste"
                }
            case 'invalid':
                return { 
                    "email": "qa@qa.com",
                    "password": "qa"
                }
            case 'new_user_login':
                return { 
                    "email": userEmail,
                    "password": userPassword
                }                
            default:
                return { notfound:"The user type was not found, please verify!" }
      }
  }
}