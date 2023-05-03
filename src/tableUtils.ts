import { handleCalendarDateClick } from "./main";

const dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const buildRowAndAppend = (
  cells: HTMLTableCellElement[],
  table: HTMLTableElement,
  rowAttributes?: {
    className?: string;
    id?: string;
  }
) => {
  const row = document.createElement("tr");
  if (rowAttributes?.className) row.className = rowAttributes.className;
  if (rowAttributes?.id) row.id = rowAttributes.id;

  cells.forEach((cell) => row.appendChild(cell));

  table.appendChild(row);
};

const clearTableRows = (table: HTMLTableElement) => {
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }
};

const buildHeaderRowAndAppend = (table: HTMLTableElement) => {
  const headerCells = dayLabels.map((day) => {
    const cell = document.createElement("th");
    cell.textContent = day;
    return cell;
  });

  buildRowAndAppend(headerCells, table, { className: "calendar-header" });
};

const buildCalendarTable = (
  monthNum: number,
  year: number,
  table: HTMLTableElement
) => {
  clearTableRows(table);

  buildHeaderRowAndAppend(table);
  const startingDay = new Date(year, monthNum, 1).getDay();
  const daysInMonth = new Date(year, monthNum + 1, 0).getDate();
  let rowCells = [];

  // fill days from prev month
  for (let i = 0; i < startingDay; i++) {
    const cell = document.createElement("td");
    rowCells.push(cell);
  }

  // add days from current month
  for (let i = 0; i < daysInMonth; i++) {
    const cell = document.createElement("td");
    const date = `${i + 1}`;
    cell.textContent = date;
    cell.className = "active-dates";
    cell.addEventListener("click", () => handleCalendarDateClick(i + 1));
    rowCells.push(cell);
    if (rowCells.length === 7) {
      buildRowAndAppend(rowCells, table);
      rowCells = [];
    }
  }

  // clean up final week
  if (rowCells.length) buildRowAndAppend(rowCells, table);
};

export {
  buildRowAndAppend,
  clearTableRows,
  buildHeaderRowAndAppend,
  buildCalendarTable,
};