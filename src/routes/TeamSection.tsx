import lin from '../assets/lin.webp'
import bbj from '../assets/bbj.webp'
import wzz from '../assets/wzz.webp'
import zws from '../assets/zws.webp'
import wjl from '../assets/wjl.webp'

const description = 'Orinav is made by a team of high school students at Beijing Academy, mentored by the Tsinghua University Institute for Accessibility Development.'

const members = [
    { name: 'Lin Donglai', role: 'Founder & Lead Developer', portrait: lin },
    { name: 'Benjamin B. Jiang', role: 'Founder & iOS Developer', portrait: bbj },
    { name: 'Wang Zhizhong', role: 'Android Developer', portrait: wzz },
    { name: 'Zhao Wangshu', role: 'Community Manager', portrait: zws },
    { name: 'Wu Jinglin', role: 'Community Manager (Retired)', portrait: wjl }
]

export default function TeamSection() {
    return (
        <section className="team-section" aria-labelledby="team-section-title">
            <header className="team-section-header">
                <h2 id="team-section-title">Team</h2>
                <p>{description}</p>
            </header>
            <ul className="team-grid">
                {members.map(member => (
                    <li className="team-member" key={member.name}>
                        <img src={member.portrait} alt="" width={280} height={300}/>
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}
