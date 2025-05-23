import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Project } from "../models/projectSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewProject = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Project Banner Image Required!", 400));
  }

  const { projectBanner } = req.files;
  const {
    title,
    description,
    gitRepoLink,
    projectLink,
    stack,
    technologies,
    deployed,
  } = req.body;

  if (
    !title ||
    !description ||
    !gitRepoLink ||
    !projectLink ||
    !stack ||
    !technologies ||
    !deployed
  ) {
    return next(new ErrorHandler("Please Provide All Details!", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    projectBanner.tempFilePath,
    { folder: "PORTFOLIO PROJECT IMAGES" }
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return next(new ErrorHandler("Failed to upload project banner to Cloudinary", 500));
  }

  const project = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    stack,
    technologies,
    deployed,
    projectBanner: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "New Project Added!",
    project,
  });
});

export const updateProject = catchAsyncErrors(async (req, res, next) => {
  const newProjectData = {
    title: req.body.title,
    description: req.body.description,
    stack: req.body.stack,
    technologies: req.body.technologies,
    deployed: req.body.deployed,
    projectLink: req.body.projectLink,
    gitRepoLink: req.body.gitRepoLink,
  };

  if (req.files && req.files.projectBanner) {
    const projectBanner = req.files.projectBanner;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return next(new ErrorHandler("Project not found!", 404));
    }

    // Delete old image from cloudinary
    await cloudinary.uploader.destroy(project.projectBanner.public_id);

    // Upload new image
    const newProjectImage = await cloudinary.uploader.upload(
      projectBanner.tempFilePath,
      { folder: "PORTFOLIO PROJECT IMAGES" }
    );

    newProjectData.projectBanner = {
      public_id: newProjectImage.public_id,
      url: newProjectImage.secure_url,
    };
  }

  const project = await Project.findByIdAndUpdate(req.params.id, newProjectData, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    return next(new ErrorHandler("Project not found!", 404));
  }

  res.status(200).json({
    success: true,
    message: "Project Updated!",
    project,
  });
});

export const deleteProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    return next(new ErrorHandler("Project already deleted or not found!", 404));
  }

  await cloudinary.uploader.destroy(project.projectBanner.public_id);
  await project.deleteOne();

  res.status(200).json({
    success: true,
    message: "Project Deleted!",
  });
});

export const getAllProjects = catchAsyncErrors(async (req, res, next) => {
  const projects = await Project.find();

  res.status(200).json({
    success: true,
    projects,
  });
});

export const getSingleProject = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    return next(new ErrorHandler("Project not found!", 404));
  }

  res.status(200).json({
    success: true,
    project,
  });
});
