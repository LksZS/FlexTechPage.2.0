/**
 * Footer — marca, navegação, contatos reais e informação de privacidade.
 * Sem CNPJ, endereço ou e-mail inventados e sem páginas legais vazias: a nota
 * de privacidade é um diálogo com o que é verdade sobre este site hoje.
 */
import { useState } from 'react';
import { Phone } from 'lucide-react';
import { AnchorLink } from '@/components/AnchorLink';
import { Brand } from '@/components/Brand';
import { Dialog } from '@/components/Dialog';
import { InstagramGlyph, WhatsAppGlyph } from '@/components/Icon';
import { company, nav, people, type PersonId } from '@/config/site';
import styles from './Footer.module.css';

const personIds: PersonId[] = ['lucas', 'igor'];

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <AnchorLink href="#topo" className={styles.brandLink} aria-label="FlexTech — voltar ao início">
              <Brand size="lg" />
            </AnchorLink>
            <p className={styles.summary}>{company.summary}</p>
            <a
              className={styles.social}
              href={company.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramGlyph width={17} height={17} />
              <span>{company.instagramHandle}</span>
            </a>
          </div>

          <nav className={styles.col} aria-label="Rodapé — seções do site">
            <h2 className={styles.colTitle}>Navegação</h2>
            <ul className={styles.list}>
              {nav.map((item) => (
                <li key={item.id}>
                  <AnchorLink href={item.href} className={styles.link}>
                    {item.label}
                  </AnchorLink>
                </li>
              ))}
              <li>
                <AnchorLink href="#faq" className={styles.link}>
                  Dúvidas frequentes
                </AnchorLink>
              </li>
              <li>
                <AnchorLink href="#investimento" className={styles.link}>
                  Investimento
                </AnchorLink>
              </li>
            </ul>
          </nav>

          {personIds.map((id) => {
            const person = people[id];
            return (
              <div className={styles.col} key={id}>
                <h2 className={styles.colTitle}>{person.name}</h2>
                <ul className={styles.list}>
                  <li>
                    <a
                      className={styles.link}
                      href={person.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppGlyph width={15} height={15} />
                      <span>WhatsApp</span>
                    </a>
                  </li>
                  <li>
                    <a className={styles.link} href={person.phoneHref}>
                      <Phone size={15} strokeWidth={1.8} aria-hidden />
                      <span>{person.phoneLabel}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className={styles.link}
                      href={person.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <InstagramGlyph width={15} height={15} />
                      <span>{person.instagramHandle}</span>
                    </a>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} {company.name}. Todos os direitos reservados.
          </p>

          <button type="button" className={styles.privacy} onClick={() => setPrivacyOpen(true)}>
            Privacidade e dados
          </button>
        </div>
      </div>

      <Dialog open={privacyOpen} onClose={() => setPrivacyOpen(false)} labelledBy="privacidade-title">
        <h2 id="privacidade-title" className={styles.privacyTitle}>
          Privacidade e dados
        </h2>
        <div className={styles.privacyBody}>
          <p>
            Este site não usa cookies de rastreamento, pixels nem scripts de analytics de terceiros.
            Nenhum dado pessoal é coletado, armazenado ou enviado por ele.
          </p>
          <p>
            O formulário de contato não envia informações para servidores: a mensagem é montada no seu
            próprio navegador e abre o aplicativo WhatsApp já preenchida. A partir daí, a conversa
            segue na plataforma escolhida, que possui política de privacidade própria.
          </p>
          <p>
            Links externos (WhatsApp, Instagram e telefone) levam você para fora deste site. Não
            usamos rastreadores de campanha nesses links.
          </p>
          <p>
            Dúvidas sobre privacidade? Fale diretamente com Lucas ou Igor pelos contatos do rodapé.
          </p>
        </div>
      </Dialog>
    </footer>
  );
}
