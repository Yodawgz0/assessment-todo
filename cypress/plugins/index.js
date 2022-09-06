import { CleanUser } from "../handlings/apiClean";

module.exports = (on, config) => {
  on("task", {
    "clear:user": () => {
      return CleanUser();
    },
  });
};
