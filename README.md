# MCAST Attendance Extension v0.5

Activates only when visiting http://attendance.mcast.edu.mt to **Add or Edit Attendance** entries. Changes heading colour to Indigo to indicate activation.

## Basic Usage
Automatically adds a new button (Indigo text) that when pressed counts the number or students marked as present.

## Advanced Usage
Allows the user to configure timetable to autofill Unit, Session & Duration fields if the attendance is being added during the lesson. Labels' colour changes to Indigo to indicate autofill. Timetable configured as CSV rows, each line represents a lesson and is in the format: DDD,START,END,UNIT where:

* DDD: 3 letter day of the week, e.g.: Mon, Thu
* START,END: 24-hr clock time in HH:MM format, e.g.: 08:30, 16:00
* UNIT: Name of the lesson's unit, e.g.: ITSFT-406-1502 - Programming Concepts

An example week is found below:
```csv
Mon,08:00,10:00,ITSFT-506-1614 - Low Level Programming II
Mon,10:00,12:00,ITSFT-506-1614 - Low Level Programming II
Mon,12:30,14:00,ITSFT-406-1502 - Programming Concepts
Tue,10:30,12:00,ITSFT-406-1502 - Programming Concepts
Wed,08:00,09:30,ITSFT-406-1502 - Programming Concepts
Wed,10:00,12:30,ITSFT-506-1614 - Low Level Programming II
Thu,08:00,10:30,ITSFT-506-1614 - Low Level Programming II
Thu,12:30,14:00,ITSFT-406-1502 - Programming Concepts
Fri,08:00,09:30,ITSFT-406-1502 - Programming Concepts
Fri,10:30,12:00,ITSFT-406-1502 - Programming Concepts
```
