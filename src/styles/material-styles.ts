import {SxProps} from "@mui/material/";

const wrapHeader : SxProps = {

}

const wrapTodoLists: SxProps = {
    display: "flex",
    gap: "50px",
    flexWrap: "wrap",
}

const wrapTodoList: SxProps = {
    position: "relative",
    p: "30px",
    height: "max-content",
    h2: {
        "textAlign": "center",
        'mb': '30px',
    },
    li: {
        display: "flex",
        alignItems: "center",
        "button:hover":{
            color: "red"
        }
    },
    'li span + span': {
        flexGrow: 1,
    },
    ul: {
        listStyle: 'none',
        mb: '15px',
        pl: 0,
    }
}

const closeTodo: SxProps = {
    position: "absolute",
    right: 0,
    top: 0,
    "&:hover":{
        color: "red"
    }
}

const wrapTaskInput: SxProps = {
    display: 'flex',
    gap: '10px',
    alignItems: "center",
    mb: "15px",
    'form':{
        position:"relative",
        display: 'flex',
        gap: '15px',
        flexWrap: "wrap",
    },
    '.errorMassage':{
        color: "red",
        fontSize: '13px',
        position: "absolute",
        left: 0,
        bottom: '-20px',
    }
}

const addTaskInput: SxProps = {
    'input': {
        p: "5px 10px"
    },
    'label': {
        top: "-3px"
    }
}

const wrapAddTodo: SxProps = {
    mt: '100px',
    mb: '50px',
}

const wrapStatusBtn: SxProps = {
    display: "flex",
    gap: "10px",
    justifyContent: "space-between",
    flexWrap: "wrap",
}

const getListStyles = (isDone: boolean): SxProps => ({
    p: 0,
    opacity: isDone ? 0.5 : 1,
})


export const SM = {
    wrapHeader,
    wrapTodoList,
    closeTodo,
    addTaskInput,
    wrapTaskInput,
    wrapStatusBtn,
    wrapAddTodo,
    wrapTodoLists,
    getListStyles,
}