const TabList = ({ isShowCompleted, displayCompleted }) => {
    return (
        <div className="nav nav-tabs">
            <span onClick={() => displayCompleted(true)} className={isShowCompleted ? "nav-link active" : "nav-link"}>
                Завершено
            </span>
            <span onClick={() => displayCompleted(false)} className={isShowCompleted ? "nav-link" : "nav-link active"}>
                Не завершено
            </span>
        </div>
    );
};

export default TabList;
