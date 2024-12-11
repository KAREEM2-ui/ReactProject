import mongoose from 'mongoose';
import ProfileModal from '../Models/ProfileModal.js';
import bcrypt from 'bcrypt';
import CustomerError from '../utilities/CustomeError.js';


export default class UserServices {
    static async IsUsernameUsed(Username)
    {
        let User = await ProfileModal.findOne({Username:Username});
        console.log(User);
        console.log(User === null);
        

        if(User === null)
        {
            return false;
        }
        


        // otherwise
        return true;
    }


    static async FindUserByUsernameOrEmail(UsernameOrEmail)
    {
        try
        {
            let User = await ProfileModal.find(
                {
                    $or: [
                        { Email:UsernameOrEmail },
                        { Username: UsernameOrEmail}
                    ]
                }
            )

            return User;
        }
        catch(e)
        {
            throw e;
        }

    }

    static async IsRegisteredEmail(Email)
    {
        let User = await ProfileModal.findOne({Email:Email});

        
        if(User === null)
        {
            return false;
        }


        // otherwise
        return true;
    }


    static async CreateUser(Username,Password,Email,Name,Status)
    {

        // hash the password
        const hashedPassword = await bcrypt.hash(Password, 10);

        let User =  new ProfileModal({Username,Password:hashedPassword,Email,Name,Status});


        try
        {
            await User.save();
        }
        catch(e)
        {
            console.log(e);
            throw e;
        }

    }

    static async UpdateUser(UserID,UserDetails)
    {
        try
        {
            let User = await ProfileModal.findOneAndUpdate(
                { _id:  UserID},       
                { $set: UserDetails }, 
                { new: true }          
            );

            console.log(User);
            
            return User;
        }
        catch(e)
        {
            throw e;
        }
    }

    static async DeleteUser(UserID,Password)
    {

        try
        {
            

            let User = await ProfileModal.findOne({_id:UserID});
            
            if (User === null)
            {
                return User;
            }

            // Check Password
            if(! await bcrypt.compare(Password,User.Password))
            {
                throw CustomerError(401,"Not Authorized to Delete");
            }

            const DeletedUser = await ProfileModal.findByIdAndUpdate(
                User._id, 
                { 
                  deletedAt: new Date(),  // Set 'deletedAt' field to current date
                  Status: "Deleted"        // Update the 'Status' field to "Deleted"
                },
            );

            return DeletedUser;
            
        }
        catch(e)
        {
            throw e;
        }
        
    }


    // Find LIST Users By ID OR NAME OR EMAIL
    static async FindUsers(UserIdentity)
    {
        try
        {
            let User = await ProfileModal.find(
                {
                    $or: [
                        { Email:UserIdentity },
                        { Username: UserIdentity},
                        {Name:UserIdentity}
                    ]
                    
                    
                },
                
                { Email: 1, Username: 1, Name: 1, _id:1 }  // Only include these fields in the result

                
            )

            return User;
        }
        catch(e)
        {
            throw e;
        }

    }
}