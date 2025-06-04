
export const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export const getToken = () => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("token");
    }
};
  
export const clearStore = async () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("token");
    }
}  

export const getMonthStartAndEnd = (month, year) => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    return {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
    };
};

export const goToNextMonth = (currentDate, hookFn) => {
    hookFn(
        (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
};

export const goToPreviousMonth = (currentDate, hookFn) => {
    hookFn(
        (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
};

export const getDateRangesForYearAndMonth = (
    year = new Date().getFullYear(),
    month = new Date().getMonth() + 1
) => {
    const formatDate = (date) => {
        const formattedYear = date.getFullYear();
        const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
        const formattedDay = String(date.getDate()).padStart(2, "0");
        return `${formattedMonth}/${formattedDay}/${formattedYear}`;
    };

    const monthStart = new Date(year, month - 1, 1);
    const monthEnd = new Date(year, month, 0);

    return {
        monthStart: formatDate(monthStart),
        monthEnd: formatDate(monthEnd),
    };
};

export const getWeekRanges = (baseDate = new Date(), direction = "current") => {
    const formatDate = (date) => {
        const formattedYear = date.getFullYear();
        const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
        const formattedDay = String(date.getDate()).padStart(2, "0");
        return `${formattedMonth}/${formattedDay}/${formattedYear}`;
    };

    const today = new Date(baseDate);
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    if (direction === "next") {
        today.setDate(today.getDate() + 7);
    } else if (direction === "previous") {
        today.setDate(today.getDate() - 7);
    }

    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - (today.getDay() || 7));

    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekStart.getDate() + 6);

    const monthWeekStart = new Date(currentWeekStart);
    const monthWeekEnd = new Date(currentWeekEnd);

    if (monthWeekStart < firstDayOfMonth) {
        monthWeekStart.setDate(firstDayOfMonth.getDate());
    }
    if (monthWeekEnd > lastDayOfMonth) {
        monthWeekEnd.setDate(lastDayOfMonth.getDate());
    }

    return {
        weekStart: formatDate(currentWeekStart),
        weekEnd: formatDate(currentWeekEnd),
    };
};

export const getFirstDayOfMonth = (currentDate) => {
    return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();
};

export const getLastDayOfMonth = (currentDate) => {
    return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDay();
};

export const getTotalDasyOfMonth = (currentDate) => {
    return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();
};

export const getDaysOfWeek = () => {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
};

export const getDayNumber = (dateStr = null) => {
    const date = dateStr ? new Date(dateStr) : new Date();

    return date.getDate();
};

export const getMonthNumber = (dateStr = null) => {
    const date = dateStr ? new Date(dateStr) : new Date();

    return date.getMonth() + 1;
};

export const getScheduleByDay = (scheduleList, day) => {
    return scheduleList?.filter((schedule) => schedule.date_day == day) || null
}

export const getFormattedSchedule = (totalDaysInMonth, scheduleList = null, currentDate) => {

    let dates = [];

    let year = String(currentDate.getFullYear());
    let month = String(currentDate.getMonth() + 1).padStart(2, '0');


    for (let i = 1; i <= totalDaysInMonth; i++) {

        let formattedDay = String(i).padStart(2, '0');

        dates.push({
            day: i,
            schedule_list: getScheduleByDay(scheduleList, i),
            date: `${year}-${month}-${formattedDay}`
        });
    }

    return dates;
}

export const normalizeDate = (date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
};