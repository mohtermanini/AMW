import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import { LoadingCounterContext, UserContext } from '../App';
import HorizontalFilter from '../components/HorizontalFilter/HorizontalFilter';
import PageTitle from '../components/PageTitle/PageTitle'
import TextBox from '../components/TextBox/TextBox'
import { Navigate } from "react-router-dom";
import SideTitleBar from '../components/SideTitleBar/SideTitleBar';
import DataTable from '../components/DataTable/DataTable';
import { urls } from '../variables/urls';
import { colors } from '../variables/colors';
import ReportCard from '../components/ReportCard/ReportCard';
import { breakpoints } from '../variables/breakpoints';

const StyledReportsPage = styled.div`
    padding: 2rem 5rem;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 4rem;
    .input-date {
        label {
        background-color: ${(props) => colors["secondary"]};
        padding: 0.75rem 1.5rem;
        color: #fff;
        border-radius: 1rem 0 0 1rem;
        }
    }
    .dates-filter {
        @media (max-width: ${breakpoints.sm}) {
            gap: 1.5rem;
            justify-content: center;
        }
    }
`;

export default function ReportsPage() {
    const [allExpenses, setAllExpenses] = useState();
    const [servicesExpenses, setServicesExpenses] = useState();
    const [usersExpenses, setUsersExpenses] = useState();
    const [specialExpenses, setSpecialExpenses] = useState();
    const [filter, setFilter] = useState("date");
    const [fromDate, setFromDate] = useState("2020-01-01");
    const [toDate, setToDate] = useState(addDays(new Date(), 1).toISOString().slice(0, 10));
    const choices = ["date", "user", "material", "service"];
    const user = useContext(UserContext);
    const loadingCounter = useContext(LoadingCounterContext);

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    useEffect(() => {
        fetchServicesExpenses();
        fetchAllExpenses();
        fetchUsersExpenses();
        fetchSpecialExpenses();
    }, []);

    useEffect(() => {
        fetchAllExpenses();
    }, [fromDate, toDate]);

    async function fetchServicesExpenses() {
        loadingCounter.loadingStart();
        const servicesExpensesData = await urls.fetch("GET", urls.base + urls.reports.services_expenses, undefined, user.token)
        loadingCounter.loadingFinished();
        setServicesExpenses(servicesExpensesData)

    }

    async function fetchAllExpenses() {
        loadingCounter.loadingStart();
        const allExpensesData = await urls.fetch("GET", urls.base + urls.reports.all_expenses +
            `?from=${fromDate}&to=${toDate}`, undefined, user.token)
        loadingCounter.loadingFinished();
        setAllExpenses(allExpensesData)
    }

    async function fetchUsersExpenses() {
        loadingCounter.loadingStart();
        const usersExpensesData = await urls.fetch("GET", urls.base + urls.reports.users_expenses,
            undefined, user.token)
        loadingCounter.loadingFinished();
        setUsersExpenses(usersExpensesData)

    }

    async function fetchSpecialExpenses() {
        loadingCounter.loadingStart();
        const specialExpensesData = await urls.fetch("GET", urls.base + urls.reports.special_expenses,
            undefined, user.token)
        loadingCounter.loadingFinished();
        setSpecialExpenses(specialExpensesData)
    }

    if (!useContext(UserContext).token) {
        return <Navigate replace to="/login" />
    }
    return (
        <StyledReportsPage>
            <PageTitle>
                Expenses Reports
            </PageTitle>
            <HorizontalFilter bgcolor="secondary" choices={choices} setState={setFilter} />

            {filter === "service" &&
                <>
                    <SideTitleBar title="Services Expenses" />
                    {servicesExpenses && servicesExpenses.map((servicesExpense, ind) => {
                        return (
                            <ReportCard key={ind} title={servicesExpense.material.name}>
                                <DataTable headers={["User", "Type", "Description", "Price", "Date"]}>
                                    {servicesExpense.outlays.map((outlay, ind) => {
                                        return (
                                            <tr key={ind}>
                                                <td>{ind + 1}</td>
                                                <td>{outlay.user.name}</td>
                                                <td>{outlay.outlayTypeDto.name}</td>
                                                <td>{outlay.description}</td>
                                                <td>{outlay.price}$</td>
                                                <td>{new Date(outlay.date).toLocaleDateString()}</td>
                                            </tr>
                                        )
                                    })}
                                </DataTable>
                                <TextBox bgcolor="primary">
                                    Total: {servicesExpense.total ?? 0}$
                                </TextBox>
                            </ReportCard>
                        )
                    })}
                </>
            }

            {filter === "date" &&
                <>
                    <SideTitleBar title="All Expenses" />
                    <div className="flex-row gap-5 dates-filter">
                        <div className="form-group input-date">
                            <label htmlFor="fromDate">From</label>
                            <input type="date" value={fromDate}
                                onChange={(e) => { setFromDate(e.target.value) }} />
                        </div>
                        <div className="form-group input-date">
                            <label htmlFor="fromDate">To</label>
                            <input type="date" value={toDate}
                                onChange={(e) => { setToDate(e.target.value) }} />
                        </div>
                    </div>
                    {allExpenses &&
                        <>
                            <DataTable headers={["User", "Type", "Material", "Description", "Price", "Date"]}>
                                {allExpenses.outlays.map((outlay, ind) => {
                                    return (
                                        <tr key={ind}>
                                            <td>{ind + 1}</td>
                                            <td>{outlay.user.name}</td>
                                            <td>{outlay.outlayTypeDto.name}</td>
                                            <td>{outlay.material.name}</td>
                                            <td>{outlay.description}</td>
                                            <td>{outlay.price}$</td>
                                            <td>{new Date(outlay.date).toLocaleDateString()}</td>
                                        </tr>
                                    )
                                })}
                            </DataTable>
                            <TextBox bgcolor="primary">
                                Total: {allExpenses.total ?? 0}$
                            </TextBox>
                        </>
                    }
                </>
            }


            {filter === "user" &&
                <>
                    <SideTitleBar title="Users Expenses" />
                    {usersExpenses && usersExpenses.map((usersExpense, ind) => {
                        return (
                            <ReportCard key={ind} title={usersExpense.user.name}>
                                <DataTable headers={["Material", "Type", "Description", "Price", "Date"]}>
                                    {usersExpense.outlays.map((outlay, ind) => {
                                        return (
                                            <tr key={ind}>
                                                <td>{ind + 1}</td>
                                                <td>{outlay.material.name}</td>
                                                <td>{outlay.outlayTypeDto.name}</td>
                                                <td>{outlay.description}</td>
                                                <td>{outlay.price}$</td>
                                                <td>{new Date(outlay.date).toLocaleDateString()}</td>
                                            </tr>
                                        )
                                    })}
                                </DataTable>
                                <TextBox bgcolor="primary">
                                    Total: {usersExpense.total ?? 0}$
                                </TextBox>
                            </ReportCard>
                        )
                    })}
                </>
            }


            {filter === "material" &&
                <>
                    <SideTitleBar title="Special Expenses" />
                    {specialExpenses && specialExpenses.map((specialExpense, ind) => {
                        return (
                            <ReportCard key={ind} title={specialExpense.material.name}>
                                <DataTable headers={["User", "Type", "Description", "Price", "Date"]}>
                                    {specialExpense.outlays.map((outlay, ind) => {
                                        return (
                                            <tr key={ind}>
                                                <td>{ind + 1}</td>
                                                <td>{outlay.user.name}</td>
                                                <td>{outlay.outlayTypeDto.name}</td>
                                                <td>{outlay.description}</td>
                                                <td>{outlay.price}$</td>
                                                <td>{new Date(outlay.date).toLocaleDateString()}</td>
                                            </tr>
                                        )
                                    })}
                                </DataTable>
                                <TextBox bgcolor="primary">
                                    Total: {specialExpense.total ?? 0}$
                                </TextBox>
                            </ReportCard>
                        )
                    })}
                </>
            }

        </StyledReportsPage>
    )
}
