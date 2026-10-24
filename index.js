const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Drugs = require("./models/pharmacySchema");

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;

// setting up Database 

const DB_URL = process.env.MONGODB_URL
mongoose.connect(`${DB_URL}`)   

.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Error connecting to MongoDB:", err))



// Post request to create a new drug

app.post("/create-drug", async (req, res) => {

 try {
    const { 
        name, 
        category,
        Composition,
        usage,
        prescriptionRequired,
        manufacturer,
        stock,
        price  
    } = req.body;

    const newDrug = new Drugs({
        name,
        category,
        Composition,
        usage,
        prescriptionRequired,
        manufacturer,
        stock,
        price
    });

    await newDrug.save();

    res.status(201).json({
         status: "true",
         message: "Drug created successfully", 
         data: {
            name: newDrug.name,
            category: newDrug.category,
            Composition: newDrug.Composition,
            usage: newDrug.usage,
            prescriptionRequired: newDrug.prescriptionRequired,
            manufacturer: newDrug.manufacturer,
            stock: newDrug.stock,
            price: newDrug.price
         }
    });
  } catch (error) {
    console.error("Error creating drug:", error);
    res.status(500).json({
      status: "false",
      message: "Error creating drug"
    });
  }
})

// Get request to fetch all drugs

app.get("/all-drugs", async (req, res) => {
    
    try {   
        const allDrugs = await Drugs.find();

        res.status(200).json({
            status: "true",
            message: "All drugs fetched successfully",
            data: allDrugs
        });
    } catch (error) {
        console.error("Error fetching drugs:", error);
        res.status(500).json({
            status: "false",
            message: "Error fetching drugs"
        });
    }
})

// delete request to delete a drug by ID

app.delete("/delete-drug/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await Drugs.findByIdAndDelete(id);

        res.status(200).json({
            status: "true",
            message: "Drug deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting drug:", error);
        res.status(500).json({
            status: "false",
            message: "Error deleting drug"
        });
    }
});

// put request to update a drug by ID

app.put("/update-drug/:id", async (req, res) => {
   try {
        const { id } = req.params;
        const {
            name, 
            category,
            Composition,
            usage,
            prescriptionRequired,
            manufacturer,
            stock,
            price
        } = req.body;

        const updatedDrug = await Drugs.findByIdAndUpdate(
            id,
            {
                name,
                category,
                Composition,
                usage,
                prescriptionRequired,
                manufacturer,
                stock,
                price
            },
            { new: true }
        );


        res.status(200).json({
            status: "true",
            message: "Drug updated successfully",
            data: updatedDrug
        });
    
    } catch (error) {
        console.error("Error updating drug:", error);
        res.status(500).json({
            status: "false",
            message: "Error updating drug"
        });
    };   
});

// patch request to update the stock of a drug by ID

app.patch("/update-part-drug/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {
             name,
             category,
             Composition,
           
         } = req.body;

        const Drug = await Drugs.findByIdAndUpdate(id);

        if (Drug) {
           Drug.name = name 
           Drug.category = category 
           Drug.Composition = Composition 

           await Drug.save();
        }
        res.status(200).json({
            status: "true",
            message: "Drug stock updated successfully",
            data: Drug
        });
        
    } catch (error) {
        console.error("Error updating drug stock:", error);
        res.status(500).json({
            status: "false",
            message: "Error updating drug stock"
        });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

