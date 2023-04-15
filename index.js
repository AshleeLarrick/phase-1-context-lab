/* Your Code Here */
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(array) {
    let employee_records = []
    for (let i = 0; i < array.length; i++) {
        let employee_record = createEmployeeRecord(array[i])
        employee_records.push(employee_record)
    }
    return employee_records
}

function createTimeInEvent(timestamp) {
    this.timeInEvents.push(
        {
            type: "TimeIn",
            hour: parseInt(timestamp.split(" ")[1]),
            date: timestamp.split(" ")[0]
        }
    )
    return this
}

function createTimeOutEvent(timestamp) {
    this.timeOutEvents.push(
        {
            type: "TimeOut",
            hour: parseInt(timestamp.split(" ")[1]),
            date: timestamp.split(" ")[0]
        }
    )
    return this
}

function hoursWorkedOnDate(date) {

    for(let i = 0; i < this.timeInEvents.length; i++) {
        if(this.timeInEvents[i].date == date) {
            for(let j = 0; j < this.timeOutEvents.length; j++) {
                if(this.timeOutEvents[i].date == date) {
                    return (this.timeOutEvents[i].hour - 
                    this.timeInEvents[i].hour) /100
                }
            }

        }
    }
    return 0

}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function calculatePayroll(array) {
    let total_pay = 0
    for(const employee_record of array) {
        total_pay += allWagesFor.call(employee_record)
    }
    return total_pay
}

function findEmployeeByFirstName(srcArray, firstName) {
    for(const record of srcArray) {
        print(record)
        if(record.firstName == firstName) {
            return record
        }
    }
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

