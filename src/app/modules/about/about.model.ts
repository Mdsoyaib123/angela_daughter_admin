// about.model.ts

import { Schema, model } from "mongoose";

export interface IAbout {
  bannerImgUrl: string;
  earlyBeginningImgUrl: string;
  fristVictoryImgUrl: string;
  tranningImgUrl: string;
  accoladesMilestonesImgUrl: string;
  playerReflectionImgUrl: string;

  totalGamePlayed: string;
  totalMajorReward: string;

  isActive: boolean;
}

const aboutSchema = new Schema<IAbout>(
  {
    bannerImgUrl: {
      type: String,
      required: [true, "Banner image is required"],
      trim: true,
    },

    earlyBeginningImgUrl: {
      type: String,
      required: [true, "Early beginning image is required"],
      trim: true,
    },

    fristVictoryImgUrl: {
      type: String,
      required: [true, "First victory image is required"],
      trim: true,
    },

    tranningImgUrl: {
      type: String,
      required: [true, "Training image is required"],
      trim: true,
    },

    accoladesMilestonesImgUrl: {
      type: String,
      required: [true, "Accolades milestones image is required"],
      trim: true,
    },

    playerReflectionImgUrl: {
      type: String,
      required: [true, "Player reflection image is required"],
      trim: true,
    },

    totalGamePlayed: {
      type: String,
      required: [true, "Total game played is required"],
      trim: true,
    },

    totalMajorReward: {
      type: String,
      required: [true, "Total major reward is required"],
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const About = model<IAbout>("About", aboutSchema);