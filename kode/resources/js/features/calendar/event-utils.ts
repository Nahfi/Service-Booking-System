let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "All-day event success",
    start: todayStr,
    backgroundColor: "rgba(0, 147, 32, 0.2)",
    borderColor: "rgba(0, 147, 32, 0.5)",
    textColor: "black",
  },

  {
    id: createEventId(),
    title: "Timed event warning",
    start: todayStr + "T01:00:00",
    backgroundColor: "rgba(247, 184, 75, 0.2)",
    borderColor: "rgba(247, 184, 75, 0.6)",
    textColor: "black",
  },

  {
    id: createEventId(),
    title: "Timed event Danger",
    start: todayStr + "T02:00:00",
    backgroundColor: "rgba(255, 37, 37, 0.15)",
    borderColor: "rgba(255, 37, 37, 0.5)",
    textColor: "black",
  },

  {
    id: createEventId(),
    title: "Timed event info",
    start: todayStr + "T03:00:00",
    backgroundColor: "rgba(84, 160, 254, 0.2)",
    borderColor: "rgba(84, 160, 254, 0.5)",
    textColor: "black",
  },

  {
    id: createEventId(),
    title: "Timed event Normal",
    start: todayStr + "T24:00:00",
    backgroundColor: "rgb(21, 33, 48, 0.1)",
    borderColor: "rgb(21, 33, 48, 0.3)",
    textColor: "black",
  },

  {
    id: createEventId(),
    title: "Timed event",
    start: todayStr + "T04:00:00",
    backgroundColor: "rgba(178, 117, 255, 0.2)",
    borderColor: "rgba(178, 117, 255, 0.5)",
    textColor: "black",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
