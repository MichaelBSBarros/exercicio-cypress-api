export default class Factory {

    static standardUser(typeUser, admin = true) {
        
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
                
            default:
                return { notfound:"The user type was not found, please verify!" }
      }
  }
}