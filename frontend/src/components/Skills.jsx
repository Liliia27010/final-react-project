export default function Skills() {
  const skills = ["React", "Node.js", "PostgreSQL", "Docker"];
  return (
    <section id="skills" style={{padding: '50px 5%', background: '#111', color: 'white'}}>
      <h2>Skills & Tools</h2>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px'}}>
        {skills.map(skill => (
          <div key={skill} style={{padding: '20px', background: '#222', borderRadius: '8px', textAlign: 'center'}}>
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}