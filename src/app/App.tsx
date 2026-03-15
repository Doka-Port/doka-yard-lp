import { PortNavbar } from './components/port-navbar';
import { PortHero } from './components/port-hero';
import { PortStatement } from './components/port-statement';
import { PortSteps } from './components/port-steps';
import { PortFeatures } from './components/port-features';
import { PortProcess } from './components/port-process';
import { PortYMS } from './components/port-yms';
import { PortAbout } from './components/port-about';
import { PortContact } from './components/port-contact';
import { PortCTA } from './components/port-cta';
import { PortFooter } from './components/port-footer';

export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fff' }}>
      <PortNavbar />
      <PortHero />
      <PortStatement />
      <PortSteps />
      <PortYMS />
      <PortAbout />
      <PortContact />
      <PortFooter />
    </div>
  );
}