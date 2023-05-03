
import CalendarTaskBox from "./CalendarTaskBox"

export default function CalendarDayBox({days}){

    const changeSelectedDate = (dayData) => {
        console.log(dayData);
    }


    return (
        <div className="CalendarDayBox">
            {days.length ? (
                days.map((dayData, index) => {
                    return (
                        <div className="dayBox" onClick={() => {changeSelectedDate(dayData)}}>
                            <h5>{dayData.date}</h5>
                            <p>{dayData.dayOfWeek}</p>
                            <CalendarTaskBox task={dayData.tasks}/>
                        </div>
                    )
                }
                )
            ) : (
                <h5>no data</h5>
            )}

                      

        </div>
    )

}