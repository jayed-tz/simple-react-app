import React, {ChangeEvent, memo, useEffect} from "react";
import {useTableData} from "../../providers";
import classNames from "./DataSwitcher.module.css";
import {dataSets} from "../../constants/DataSets";

const DataSwitcher: React.FC = () => {
    // State Hooks
    const {dataSet, setDataSet} = useTableData();

    // Effects
    useEffect(() => {
        setDataSet?.(dataSets[0].id);
    }, [setDataSet]);

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newDataSet = e.target.value;
        setDataSet?.(newDataSet);
    };

    return (
        <div className={classNames.container}>
            <label className={classNames.label}>Select dataset:</label>
            <select
                data-testid="dataset-switcher"
                value={dataSet}
                onChange={onChange}
            >
                {dataSets.map(({id, name}) => (
                    <option key={id} value={id} data-testid="dataset-option">
                        {name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default memo(DataSwitcher);
