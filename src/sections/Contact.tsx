/**
 * Contato — CTA final e fluxo de conversão.
 * ---------------------------------------------------------------------------
 * Quatro passos curtos: tipo de projeto → descrição (opcional) → com quem falar
 * → abrir o WhatsApp com a mensagem pronta (`encodeURIComponent`).
 *
 * Nada é enviado, armazenado ou simulado: a mensagem é montada no navegador e a
 * conversa continua no WhatsApp. Nome é opcional; nenhum campo desnecessário.
 */
import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Button, WhatsAppLink } from '@/components/Button';
import { InstagramGlyph, WhatsAppGlyph } from '@/components/Icon';
import { SectionHeading } from '@/components/SectionHeading';
import { company, cta, people, type PersonId } from '@/config/site';
import {
  buildContactMessage,
  projectTypes,
  whatsappLinkWithMessage,
  type ProjectTypeId,
} from '@/lib/whatsapp';
import { trackCta, trackWhatsAppClick } from '@/lib/analytics';
import { cx } from '@/lib/cx';
import styles from './Contact.module.css';

export function Contact() {
  const [projectType, setProjectType] = useState<ProjectTypeId | null>(null);
  const [person, setPerson] = useState<PersonId | null>(null);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [opened, setOpened] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!projectType) {
      setError('Escolha o tipo de projeto para montar a mensagem.');
      return;
    }
    if (!person) {
      setError('Escolha com quem você quer falar: Lucas ou Igor.');
      return;
    }

    setError(null);
    const url = whatsappLinkWithMessage(
      person,
      buildContactMessage({ person, projectType, description, name }),
    );

    trackCta('contato', cta.final);
    trackWhatsAppClick(person, 'contato');

    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win) window.location.href = url; // fallback se o navegador bloquear pop-up
    setOpened(true);
  };

  return (
    <section id="contato" className="section" aria-labelledby="contato-title">
      <div className="container">
        <div className={styles.shell}>
          <div className={styles.side}>
            <SectionHeading
              index="06"
              eyebrow="Contato"
              title={<span id="contato-title">Seu próximo projeto começa com uma conversa.</span>}
              lead="Conte o que você quer construir. Vamos entender seu cenário e encontrar o melhor caminho."
              className={styles.heading}
            />

            <ul className={styles.assurances}>
              <li>
                <Check size={15} strokeWidth={2.2} aria-hidden />
                Resposta de quem executa o projeto, não de um robô.
              </li>
              <li>
                <Check size={15} strokeWidth={2.2} aria-hidden />
                Nenhuma informação fica armazenada neste site.
              </li>
              <li>
                <Check size={15} strokeWidth={2.2} aria-hidden />
                A conversa continua no WhatsApp, no seu ritmo.
              </li>
            </ul>

            <div className={styles.direct}>
              <p className={styles.directTitle}>Prefere ir direto?</p>
              <div className={styles.directLinks}>
                <WhatsAppLink
                  variant="quiet"
                  person="lucas"
                  trackLocation="contato_direto"
                  href={whatsappLinkWithMessage('lucas', 'Olá, Lucas! Vim pelo site da FlexTech.')}
                >
                  {people.lucas.firstName}
                </WhatsAppLink>
                <WhatsAppLink
                  variant="quiet"
                  person="igor"
                  trackLocation="contato_direto"
                  href={whatsappLinkWithMessage('igor', 'Olá, Igor! Vim pelo site da FlexTech.')}
                >
                  {people.igor.firstName}
                </WhatsAppLink>
                <a
                  className={styles.directInstagram}
                  href={company.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCta('contato', 'instagram')}
                >
                  <InstagramGlyph width={16} height={16} />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>
                <span className={styles.legendStep}>1</span> Que tipo de projeto?
              </legend>
              <div className={styles.chips} role="radiogroup" aria-label="Tipo de projeto">
                {projectTypes.map((type) => (
                  <label
                    key={type.id}
                    className={cx(styles.chip, projectType === type.id && styles.chipActive)}
                  >
                    <input
                      type="radio"
                      name="tipo-projeto"
                      value={type.id}
                      checked={projectType === type.id}
                      onChange={() => {
                        setProjectType(type.id);
                        setError(null);
                      }}
                      className={styles.radio}
                    />
                    <span className={styles.chipLabel}>{type.label}</span>
                    <span className={styles.chipHint}>{type.hint}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="contato-descricao">
                2 · Conte em poucas linhas <span className={styles.optional}>(opcional)</span>
              </label>
              <textarea
                id="contato-descricao"
                className={styles.textarea}
                rows={4}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Ex.: quero um site para o studio com agendamento e galeria de trabalhos."
              />
            </div>

            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>
                <span className={styles.legendStep}>3</span> Com quem você quer falar?
              </legend>
              <div className={styles.people} role="radiogroup" aria-label="Responsável pela conversa">
                {(['lucas', 'igor'] as const).map((id) => (
                  <label
                    key={id}
                    className={cx(styles.person, person === id && styles.personActive)}
                  >
                    <input
                      type="radio"
                      name="responsavel"
                      value={id}
                      checked={person === id}
                      onChange={() => {
                        setPerson(id);
                        setError(null);
                      }}
                      className={styles.radio}
                    />
                    <span className={styles.personMonogram} aria-hidden="true">
                      {people[id].initials}
                    </span>
                    <span className={styles.personBody}>
                      <span className={styles.personName}>{people[id].name}</span>
                      <span className={styles.personPhone}>{people[id].phoneLabel}</span>
                    </span>
                    <WhatsAppGlyph width={17} height={17} className={styles.personGlyph} />
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="contato-nome">
                4 · Seu nome <span className={styles.optional}>(opcional)</span>
              </label>
              <input
                id="contato-nome"
                className={styles.input}
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Como podemos te chamar"
              />
            </div>

            <div className={styles.submitRow}>
              <Button type="submit" size="lg" trackLocation="contato">
                {cta.final}
              </Button>
              <p className={styles.submitNote} aria-live="polite">
                {opened
                  ? 'Abrimos o WhatsApp em outra aba — a conversa continua por lá.'
                  : 'A mensagem é montada no seu navegador e abre o WhatsApp preenchida.'}
              </p>
            </div>

            {error ? (
              <p className={styles.error} role="alert">
                <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden />
                {error}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
