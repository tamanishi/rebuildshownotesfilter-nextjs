import { useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'

export default function Query({ setQuery }) {
    const [,render]=useState()

    return (
        <Row><Col xs="3"><Form.Control type='text' placeholder='query' onChange={e => { render(); setQuery(e.target.value); }} /></Col></Row>
    );
}
