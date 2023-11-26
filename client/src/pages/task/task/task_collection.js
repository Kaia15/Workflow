import TaskCard from "./task_card";

export default function TaskCollection({setEdit,setTaskId,handleDelete,onSubmit,
    taskId,style,edit,a,priority_text,idx}) {
  // console.log(onSubmit);
  return (
    <div style={{ flex: "1" }}>
      <h4 style={{ margin: "16px 0px", textAlign: "center" }}>{priority_text}</h4>
      {a[idx].map((it) => {
        return (
          <TaskCard
            onSubmit={onSubmit}
            it={it}
            taskId={taskId}
            setEdit={setEdit}
            setTaskId={setTaskId}
            handleDelete={handleDelete}
            edit={edit}
            style={style}
          />
        );
      })}
    </div>
  );
}
