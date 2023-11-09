import PageContainer from "@/components/common/PageContainer";
import styled from "@emotion/styled";
import { useState } from "react";
import { useQuery } from "react-query";
import List from "@/components/attendance/List";
import { getAttendanceCheckList } from "@/utils/api/selfStudy";
import Header from "@/components/attendance/Header";
import Filter from "@/components/attendance/Filter";
import NoData from "@/components/common/Nodata";

const AttendancePage = () => {
  const [className, setClassName] = useState<string>("");
  const [classroomId, setClassroomId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const isFriday = new Date(date).getDay() === 5;

  const { data: attendanceCheckList, isSuccess } = useQuery(
    [className, date],
    () =>
      getAttendanceCheckList({
        classroom_id: classroomId,
        date: date,
      }),
    {
      enabled: !!classroomId,
    }
  );

  const filter: JSX.Element = (
    <Filter
      setClassName={setClassName}
      setDate={setDate}
      setClassroomId={setClassroomId}
    />
  );

  return (
    <PageContainer title="출결 상태" filter={filter}>
      <>
        <Header className={className} isFriday={isFriday} />
        <StudentWrapper>
          {isSuccess && attendanceCheckList.student_list.length ? (
            attendanceCheckList.student_list.map((data, idx) => {
              return (
                <List
                  key={idx}
                  isFriday={isFriday}
                  studentName={data.student_name}
                  studentNumber={data.student_number}
                  attendanceList={data.type_list}
                  studentId={data.student_id}
                />
              );
            })
          ) : (
            <NoDataContainer>
              <NoData />
            </NoDataContainer>
          )}
        </StudentWrapper>
      </>
    </PageContainer>
  );
};

const StudentWrapper = styled.div`
  height: 88%;
  overflow-y: scroll;
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

const NoDataContainer = styled.div`
  margin: auto;
`;

export default AttendancePage;
