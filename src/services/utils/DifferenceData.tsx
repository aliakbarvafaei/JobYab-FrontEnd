import { DateDiff } from "../../ts/functions";

const DifferenceData = (date: string) => {
  return DateDiff.inMonths(new Date(), new Date()) === 0 ? (
    DateDiff.inWeeks(new Date(date), new Date()) === 0 ? (
      DateDiff.inDays(new Date(date), new Date()) === 0 ? (
        DateDiff.inHour(new Date(date), new Date()) === 0 ? (
          <>دقایقی پیش</>
        ) : (
          <>{DateDiff.inHour(new Date(date), new Date())} ساعت پیش</>
        )
      ) : (
        <>{DateDiff.inDays(new Date(date), new Date())} روز پیش</>
      )
    ) : (
      <>{DateDiff.inWeeks(new Date(date), new Date())} هفته پیش</>
    )
  ) : (
    <>{DateDiff.inMonths(new Date(date), new Date())} ماه پیش</>
  );
};
export default DifferenceData;
