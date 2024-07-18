import {SxProps} from "@mui/material/";

// loading
const wrapCircularProgress: SxProps = {
    position: 'fixed',
    top: '30%',
    textAlign: 'center',
    width: '100%'
}

// todolist
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

const wrapAddTodo: SxProps = {
    mt: '100px',
    mb: '50px',
}

// form
const itemForm: SxProps = {
    marginBottom: '10px'
}

const itemInput: SxProps = {
    'input': {
        p: "5px 10px"
    },
    'label': {
        top: "-3px"
    }
}

// task
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

// login
const loginFormContainer: SxProps = {
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    justifyContent: "center",
    alignItems: "center",
}

const loginAvatar: SxProps = {
    width: 60,
    height: 60,
    backgroundColor: 'secondary.main',
    borderRadius:2,
    marginBottom: 2
}

const loginTitle: SxProps = {
    marginBottom: 2
}

const loginForm: SxProps = {
    display: "flex",
    gap: "26px",
    flexDirection: "column",
    width: '100%',
}

const loginLabelCheckbox: SxProps = {
    margin: "-10px 0",
    width: "max-content",
}

export const SM = {
    wrapCircularProgress,
    wrapTodoList,
    closeTodo,
    itemInput,
    itemForm,
    wrapStatusBtn,
    wrapAddTodo,
    wrapTodoLists,
    getListStyles,
    loginFormContainer,
    loginAvatar,
    loginTitle,
    loginForm,
    loginLabelCheckbox,
}