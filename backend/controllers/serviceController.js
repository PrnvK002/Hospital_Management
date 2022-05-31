import asyncHandler from 'express-async-handler'
import Service from '../models/services.js';


//@desc getting service
//@acess public
//@path /services
export const getServices = asyncHandler(async(req,res)=> {

    const services = await Service.find({});
    if(services.length > 0){
        res.status(200).json({ services })
    }else{
        res.status(204);
        throw new Error('Nothing in services');
    }

});

//@desc adding service
//@acess admin
//@path /services

export const addServices = asyncHandler(async (req,res)=> {
    
    const data = new Service({
        serviceName : req.body.serviceName,
        description : req.body.description,
        image : req.body.image
    });

    const services = await data.save();
    
    if(services){
        res.status(200).json({ services });
    }else{
        res.status(500);
        throw new Error('Error occured while adding services');
    }

}); 