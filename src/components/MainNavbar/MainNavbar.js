import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { StyledMainNavbar } from './MainNavbar.styled'
import Button from "../Button/Button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { UserContext } from '../../App'

export default function MainNavbar() {
    const location = useLocation();
    const user = useContext(UserContext);
    const isAdmin = user.accoutnType === 0;
    return (
        <StyledMainNavbar>
            <ul>
                {isAdmin &&
                    <li>
                        <Link to="reports">
                            <Button layout={location.pathname === "/reports" ? "" : "outline"}
                                bgcolor="primary" size="tall" scRadius="10"
                            >
                                <FontAwesomeIcon icon={solid('chart-line')} />
                                Reports
                            </Button>
                        </Link>
                    </li>
                }                {isAdmin &&

                    <li>
                        <Link to="materials">
                            <Button layout={location.pathname === "/materials" ? "" : "outline"}
                                bgcolor="primary" size="tall" scRadius="10"
                            >
                                <FontAwesomeIcon icon={solid('cube')} />
                                Materials
                            </Button>
                        </Link>
                    </li>
                }                {isAdmin &&

                    <li>
                        <Link to="outlay-types">
                            <Button layout={location.pathname === "/outlay-types" ? "" : "outline"}
                                bgcolor="primary" size="tall" scRadius="10"
                            >
                                <FontAwesomeIcon icon={solid('tag')} />

                                Outlay Types
                            </Button>
                        </Link>
                    </li>
                }
                <li>
                    <Link to="outlays">
                        <Button layout={location.pathname === "/outlays" ? "" : "outline"}
                            bgcolor="primary" size="tall" scRadius="10"
                        >
                            <FontAwesomeIcon icon={solid('money-check-dollar')} />

                            Outlays
                        </Button>
                    </Link>
                </li>                {isAdmin &&

                    <li>
                        <Link to="users">
                            <Button layout={location.pathname === "/users" ? "" : "outline"}
                                bgcolor="primary" size="tall" scRadius="10"
                            >
                                <FontAwesomeIcon icon={solid('users')} />
                                Users
                            </Button>
                        </Link>
                    </li>
                }
            </ul>
        </StyledMainNavbar>
    )
}
