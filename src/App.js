import CalendarHeatmap from "reactjs-calendar-heatmap";
import React, {useState} from "react";
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardActions, CardContent, Checkbox, Container, Grid, Paper, TextareaAutosize, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { alpha, styled } from "@mui/material/styles";

const App = () => {
    var data = [
    {
      "date": "2022-02-01",
      "total": 3,
      "details": [{
        "name": "Project 1",
        "date": "2022-01-01 12:30:45",
        "value": 9192
      }, {
        "name": "Project 2",
        "date": "2022-01-01 13:37:00",
        "value": 6753
      },
      {
        "name": "Project N",
        "date": "2022-01-01 17:52:41",
        "value": 1219
      }]
    },
    {
      "date": "2022-05-01",
      "total": 1,
      "details": [{
        "name": "Project 1",
        "date": "2022-05-01 12:30:45",
        "value": 9192
      }, {
        "name": "Project 2",
        "date": "2022-05-01 13:37:00",
        "value": 6753
      },
      {
        "name": "Project N",
        "date": "2022-05-01 17:52:41",
        "value": 1219
      }]
    }
    ]
  return (
    <Container maxWidth="lg">
      <h1 style={{fontFamily: 'Roboto Mono'}}> Habitify </h1>
      <Todo />
      <h5 style={{fontFamily: 'Roboto Mono'}}> 0 tasks completed towards your goals </h5>
      <CalendarHeatmap data={data} overview="year"/>
    </Container>
  )
}

const TaskTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'black',
    fontFamily: "Roboto Mono"
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'black',
    fontFamily: "Roboto Mono"
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black',
      fontFamily: "Roboto Mono"
    },
    '&:hover fieldset': {
      borderColor: 'black',
      fontFamily: "Roboto Mono"
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
      fontFamily: "Roboto Mono"
    },
  },
});

const Todo = () => {
  const [taskList, setTaskList] = useState([
    {name: 'Finish coding', reason: 'helps get money', description: 'do this deligently', done: false},
  ]);
  const [addTaskView, showAddTaskView] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskReason, setTaskReason] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleTaskSubmit = () => {
    let task = {name: taskName, reason: taskReason, description: taskDescription, done: false};
    let updatedTaskList = [...taskList, task];
    console.log(updatedTaskList);
    setTaskList(updatedTaskList);
    showAddTaskView(false);
  }

  const handleTaskDone = (task) => {
    let n = taskList.length;
    let updatedTaskList = [];
    for (let i=0; i<n; i++) {
      let taskItem = taskList[i];
      if (taskItem == task) taskItem.done = !taskItem.done;
      updatedTaskList.push(taskItem);
    }
    setTaskList(updatedTaskList);
  }

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item>
          <h3 style={{fontFamily: 'Roboto Mono'}}> Today's Tasks </h3>
        </Grid>
        <Grid item>
          <Button 
            style={{marginTop: '14px', color: 'black', fontFamily: "Roboto Mono"}} 
            startIcon={<AddIcon />}
            onClick={() => showAddTaskView(!addTaskView)}
          >
            Add Task
          </Button>
        </Grid>
      </Grid>
      {addTaskView && 
        <Card style={{maxWidth: '500px'}}>
          <CardContent>
            <TaskTextField 
              onChange={e => setTaskName(e.target.value)}
              style={{width: '400px'}} 
              label="Task" />
            <br/> <br/>
            <TaskTextField 
              onChange={e => setTaskReason(e.target.value)}
              style={{width: '400px'}} 
              label="Why this task ?" />
            <br/> <br/>
            <TextareaAutosize
              onChange={e => setTaskDescription(e.target.value)}
              placeholder="Describe task"
              style={{ width: 395, height: 80, fontFamily: 'Roboto Mono' }}
            />
          </CardContent>
          <CardActions>
            <Button
              style={{color: 'black', fontFamily: "Roboto Mono"}}
              onClick={handleTaskSubmit}
            > 
              Submit 
            </Button>
          </CardActions>
        </Card>
      } 
      {taskList.map((task, id) => (
        <TaskListItem 
          handleTaskDone={() => handleTaskDone(task)} 
          key={id} 
          task={task}
        />
      ))}
    </React.Fragment>
  )
}

const TaskListItem = ({task, handleTaskDone}) => {
  const [expand, setExpand] = useState(false);

  return (
    <React.Fragment>
      <Accordion expanded={expand} style={{maxWidth: '500px', }}>
        <AccordionSummary aria-controls="panel1a-content" expandIcon={<ExpandMoreIcon onClick={() => setExpand(!expand)} /> }>
          <Checkbox checked={task.done} onChange={handleTaskDone}/>
          {task.done == true ? <h5 style={{fontFamily: "Roboto Mono"}}> <strike> {task.name}</strike> </h5>
            : <h5 style={{fontFamily: "Roboto Mono"}}> {task.name} </h5> }
        </AccordionSummary>
        <AccordionDetails>
          <h5 style={{fontFamily: "Roboto Mono"}}> Why do this task? <br/> Ans: "{task.reason}" </h5>
          <p style={{fontFamily: "Roboto Mono", marginTop: '20px'}}> {task.description} </p>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  )
}


export default App;
