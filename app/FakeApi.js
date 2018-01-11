/**
 * Fake api calls to localStorage
 */
var FakeApi = {
    getUserIdCount: function() {
        return localStorage.getItem('userIdCount') || 0;
    },
    getUserData: function() {
        return localStorage.getItem('userJson');
    },
    
    signUp: function(email, password) {
        var existingUsers = JSON.parse(this.getUserData()) || [];
        var userIdCount = this.getUserIdCount();
        var user_data = {
            email: email,
            password: password,
            userId: parseInt(userIdCount++)
        }
        var user = this.findUser(email);
        if (!user) {
            existingUsers.push(user_data)
            localStorage.setItem('userJson', JSON.stringify(existingUsers));
            localStorage.setItem('userIdCount', parseInt(userIdCount++));
            return {
                status: 1,
                message: "Thank you for signing up " + email,
                userId: parseInt(userIdCount++)
            }
        } else {
            return {
                status: -1,
                message: "An account already exists for this email"
            }
        }
        

        
    },
    login: function(email, password) {
        var existingUsers = JSON.parse(this.getUserData()) || [];
        var user = this.findUser(email);
        if (user && user.password == password) {
            return {
                status: 1,
                message: "Login Success",
                email: email,
                userId: user.userId
            }
        } else {
            return {
                status: -1,
                message: "Invalid email/password combination"
            }
        }
    },
        
    findUser: function(email) {
        var existingUsers = JSON.parse(this.getUserData()) || [];
        for (var i=0; i<existingUsers.length; i++) {
            if (existingUsers[i].email == email) {
                return existingUsers[i];
                break;
            }
        }
        return undefined;
    }
};

export default FakeApi;
