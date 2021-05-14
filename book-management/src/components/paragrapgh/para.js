function Para(props) {
    const { text, color} = props;
    return (
      <div className="w-full">
        <p style={{color}}>{text}</p>
      </div>
    );
  }
  
  export default Para;