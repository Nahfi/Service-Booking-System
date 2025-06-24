
export const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

// Download File
export const downloadFile = (url) => {
    const URL = url;
    if (typeof window !== "undefined") {
        window.location.href = URL;
    }
};

// Export CSV 
export const exportCSVExel = (
    export_type,
    headers,
    rows,
    file_name = "users"
) => {
    if (export_type === "exel") {
        const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, keyToValue(file_name));
        XLSX.writeFile(wb, `${file_name}.xlsx`);
    } else {
        const csvContent = [headers, ...rows]
            .map((e) => e.join(","))
            .join("\n");
        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        saveAs(blob, `${file_name}.csv`);
    }
};

// Export PDF
export const exportToPDF = (
    headers,
    rows,
    columnWidths,
    file_name = "users"
) => {
    const doc = new jsPDF();
    const marginLeft = 14;
    const marginTop = 10;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    let yPosition = marginTop;

    doc.setFontSize(14);
    doc.text(`Exported ${file_name}`, marginLeft, yPosition);
    yPosition += 20;
    doc.setFontSize(7);
    const totalWidth = columnWidths.reduce((acc, width) => acc + width, 0);
    const startX = (pageWidth - totalWidth) / 2;

    headers.forEach((header, index) => {
        const xPosition =
            startX +
            columnWidths.slice(0, index).reduce((acc, width) => acc + width, 0);
        doc.text(header, xPosition, yPosition);
    });

    yPosition += 12;

    doc.setFontSize(7);
    rows.forEach((row) => {
        if (yPosition > pageHeight - 20) {
            doc.addPage();
            yPosition = marginTop + 10;

            headers.forEach((header, index) => {
                const xPosition =
                    startX +
                    columnWidths
                        .slice(0, index)
                        .reduce((acc, width) => acc + width, 0);
                doc.text(header, xPosition, yPosition);
            });
            yPosition += 12;
        }

        row.forEach((cell, colIndex) => {
            const xPosition =
                startX +
                columnWidths
                    .slice(0, colIndex)
                    .reduce((acc, width) => acc + width, 0);
            doc.text(String(cell), xPosition, yPosition);
        });

        yPosition += 8;
    });

    doc.save(`exported-${file_name}.pdf`);
};
  

// Convert key to value
export const keyToValue = (text: string, replaceWith: string = " "): string => {
    try {
        return text
            .replace(/_/g, replaceWith)
            .toLowerCase()
            .replace(/^./, (char) => char.toUpperCase());
    } catch (error) {
        return text;
    }
};

// Convert value to key
export const valueToKey = (text: string, separator: string = "_"): string => {
    try {
        return text.replace(/\s+/g, separator).toLowerCase();
    } catch (error) {
        return text;
    }
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

    // Cookies.remove("authToken");
    // await persistor.purge();
    // store.dispatch({ type: "RESET_STORE" });
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

export const getFilterableUrl = (url, filters) => {
    Object.entries(filters).forEach(([key, value], index) => {
        if (index === 0) {
            url += "?";
        } else {
            url += "&";
        }
        url += `${key}=${value || null}`;
    });

    return url;
};

export const handlePageChange = (page, hookFn) => {
    hookFn((prevState) => ({
        ...prevState,
        page: page,
    }));
};