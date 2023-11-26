import {
    remindImg,
    friendImg,
    taskImg,
    musicImg,
    timerImg,
    messImg,
} from "../../assets/img";

export const settings = ["profile"];

export const contents = [
  ["active", "See your friends who's active"],
  ["message", "inbox with friends in your list"],
  ["task", "fill today's tasks"],
  ["music", "listen to favorite music"],
  ["reminders", "add your reminders and take care your health"],
  ["timer", "Set timer to focus/ Take break"],
];

export const urls = [
  `url(${friendImg})`,
  `url(${messImg})`,
  `url(${taskImg})`,
  `url(${musicImg})`,
  `url(${remindImg})`,
  `url(${timerImg})`,
];
