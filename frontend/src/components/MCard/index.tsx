import Card from 'react-bootstrap/Card';

interface Props {
  title: string,
  subtitle: string,
  text: string[],
  activeItem?: boolean,
  footer?: JSX.Element,
}

export default function MCard(arg: Props) {
  return (
    <Card style={{ width: '25rem', height: '25rem' }}>
      <Card.Body>
        <Card.Title className={arg.activeItem == false ? 'text-muted' : ''}>{arg.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{arg.subtitle}</Card.Subtitle>
        <br />
        <Card>
          {arg.text.map((text, index) => (
            <Card.Text style={{"margin": "0 0 0 0"}} key={index}>
              {text}
            </Card.Text>
          ))}
        </Card>
      </Card.Body>
      {
        arg.footer != undefined &&
      <Card.Footer>
        {arg.footer}    
      </Card.Footer>
      }
    </Card>
  )
}