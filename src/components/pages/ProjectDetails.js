import React ,{useState,useEffect}from 'react';
import * as projectServices from "../Services/projectService";
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StepButton from '@material-ui/core/StepButton';
import EvStationIcon from '@material-ui/icons/EvStation';
import PersonIcon from '@material-ui/icons/Person';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import ProjectPlot from "./Projects/Plots/ProjectPlot";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Plots','Gallery','Location','Analysis','Report'];
}

function getStepContent(step,id) {
  switch (step) {
    case 0:
      return <><ProjectPlot/></>;
    case 1:
        return <ProjectPlot/>;
    case 2:
        return <ProjectPlot/>;
    default:
      return 'Unknown step';
  }
}

export default function ProjectDetails(props) {
  const classes = useStyles();
  const [records,setRecords] = useState([])
  const id = props.match.params.id
  const [activeStep, setActiveStep] = React.useState(1);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  useEffect(() => {
     fetchProject()
    }, [activeStep])

async function fetchProject(){
   const response =  projectServices.getOneProject(id)
   setRecords(response)

}

const totalSteps = () => {
  return steps.length;
};

const completedSteps = () => {
  return Object.keys(completed).length;
};

const isLastStep = () => {
  return activeStep === totalSteps() - 1;
};

const allStepsCompleted = () => {
  return completedSteps() === totalSteps();
};

const handleNext = () => {
  const newActiveStep =
    isLastStep() && !allStepsCompleted()
      ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
      : activeStep + 1;
  setActiveStep(newActiveStep);
};

const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

const handleStep = (step) => () => {
  setActiveStep(step);
};

const handleComplete = () => {
  const newCompleted = completed;
  newCompleted[activeStep] = true;
  setCompleted(newCompleted);
  handleNext();
};

const handleReset = () => {
  setActiveStep(0);
  setCompleted({});
};

return (
  <div className={classes.root}>
    <Stepper nonLinear activeStep={activeStep}>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepButton onClick={handleStep(index)} completed={completed[index]}>
            <StepLabel>{label}</StepLabel>
          </StepButton>
        </Step>
      ))}
    </Stepper>
    <div>
      {allStepsCompleted() ? (
        <div>
          <Typography className={classes.instructions}>
            All steps completed - you&apos;re finished
          </Typography>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      ) : (
        <div>
          <Typography className={classes.instructions}>{getStepContent(activeStep,id)}</Typography>
          <div>
            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              Next
            </Button>
            {activeStep !== steps.length &&
              (completed[activeStep] ? (
                <Typography variant="caption" className={classes.completed}>
                  Step {activeStep + 1} already completed
                </Typography>
              ) : (
                <Button variant="contained" color="primary" onClick={handleComplete}>
                  {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                </Button>
              ))}
          </div>
        </div>
      )}
    </div>
  </div>
);
}