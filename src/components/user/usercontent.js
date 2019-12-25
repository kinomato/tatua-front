import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card } from 'react-bootstrap'
import { Link, Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'

import Profile from './profile';
import History from './history';

function Usercontent() {

    const temp = useRouteMatch();
    const { path, url } = temp;
    return (

        <Row>
            <Col sm={3}>
                <Card>
                    <Card.Body>
                        <Card.Text>
                            <Link to={`${url}/profile`}>Thay đổi thông tin</Link>
                        </Card.Text>
                        <Card.Text>
                            <Link to={`${url}/history`}>Lịch sử giao dịch</Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Switch>

                    <Redirect exact from={path} to={`${path}/profile`} />
                    <Route path={`${path}/profile`} component={Profile} />
                    <Route path={`${path}/history`} component={History} />


                </Switch>


            </Col>
        </Row>

    )

}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Usercontent)
