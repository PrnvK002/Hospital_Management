import asyncHandler from "express-async-handler";
import Report from "../models/medicalReport.js";

//@desc get all medical reports
//@access private doctor
//@route get /reports

export const getMedicalReport = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const reports = await Report.find({ user_id: id });
  if (reports) {
    res.status(200).json({ reports });
  } else {
    res.status(404);
    throw new Error("No reports found");
  }
});

//@desc add report
//@access private staff
//@route post /report

export const addReport = asyncHandler(async (req, res) => {
  console.log(req.body);
  const report = new Report({
    user_id: req.body.user,
    testType: req.body.test,
    details: req.body.details,
  });

  const data = await report.save();
  if (data) {
    res.status(201).json({ data });
  } else {
    res.status(500);
    throw new Error(
      "Failed to add report try after some time or contact admin"
    );
  }
});

//@desc get single medical reports
//@access private doctor
//@route get /report/:id(reportId);

export const getSingleReport = asyncHandler(async (req,res) => {

    const id = req.params.id;
    const report = await Report.findOne({ _id : id });
    if(report){
        res.status(200).json({ report });
    }else{
        res.status(404);
        throw new Error('Error occured while getting report');
    }

});

