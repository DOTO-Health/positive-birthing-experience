# Positive Birthing: A Concept Note

*Why the experience of childbirth matters, what the evidence says, what good practice looks like,
and how this project turns it into a tool for the labour room.*

> **Status and honesty note.** This note summarises published guidance and research for a general
> and professional audience. It is not clinical guidance and not medical advice. It was compiled from
> the sources listed at the end; several were read through official summaries rather than the full
> text, and the evidence for many comfort practices is of **low certainty**. Numbers are quoted from
> the sources and should be checked against them before being reused. Clinical content in this
> project is reviewed under [QA_PROCESS.md](../QA_PROCESS.md).

## 1. In one page

- About 140 million women give birth every year [[1]](#references). For decades, labour-room care has
  focused on preventing death and complications. That focus is essential and remains the first
  priority. But **how a woman is treated and what she goes through also matters**, to her, to her
  baby, and to her health afterwards.
- **Positive birthing** is a woman-centred approach to labour and birth. The World Health
  Organization (WHO) describes a *positive childbirth experience* as one that **fulfils or exceeds a
  woman's own beliefs and expectations**, in a clinically and psychologically safe place, with
  continuous practical and emotional support from companions and skilled, respectful staff [[1]](#references)[[2]](#references).
- It is **not** an alternative to medical care and not a rejection of intervention. It means giving
  every woman safe care *and* dignity, information, choice, comfort and support.
- Practices that are widely recommended include a **companion of her choice**, **respectful
  communication and privacy**, **freedom to eat, drink and move**, **non-drug comfort measures**
  (breathing, relaxation, massage, music), and **avoiding routine interventions that are not
  needed** [[1]](#references)[[3]](#references).
- The strongest evidence is for **continuous support in labour**. For several comfort practices the
  evidence is encouraging but of low certainty, and more good trials are needed [[4]](#references)[[5]](#references)[[6]](#references).
- The gap is largely in **delivery**: guidelines exist, but busy staff in busy labour rooms rarely
  have the time to read them. This project, **Positive Birthing Companion**, is an offline, open-source
  tool that puts a small set of these practices in the nurse's hands at the bedside.

## 2. Background

### 2.1 From survival to experience

Maternal and newborn survival has been the defining goal of maternity care, and rightly so. WHO's
2018 guideline adds a second goal: women's *experience* of care. It notes that the growing
medicalisation of normal childbirth may undermine a woman's own capability to give birth and harm
her experience, and it points to the rise in unnecessary caesarean sections [[2]](#references).

### 2.2 What women say they want

A WHO-commissioned systematic review of qualitative studies (35 studies from 19 countries in its main
search) found that the most important thing for most women is a positive experience that meets or
exceeds their prior beliefs and expectations. Women who needed intervention still wanted to feel in
control through active decision-making, and they valued safety and psychosocial well-being equally [[7]](#references).

### 2.3 Why disrespect matters

A mixed-methods review of 65 studies from 34 countries found that mistreatment of women during
childbirth in facilities is reported worldwide, and sorted it into seven domains: physical abuse,
sexual abuse, verbal abuse, stigma and discrimination, failure to meet professional standards of
care, poor rapport between women and providers, and health-system conditions [[8]](#references). In 2014 WHO issued a
statement that every woman has the right to dignified, respectful care, and that disrespect and
abuse during childbirth can violate fundamental human rights [[9]](#references).

### 2.4 Why it matters after the birth

A negative birth experience is linked with longer-term harm. A 2017 meta-analysis of 59 studies
estimated that about 4% of women in community samples, and about 18.5% in high-risk groups, have
post-traumatic stress disorder after birth [[10]](#references). A 2017 systematic review of risk factors identified a negative
subjective experience of childbirth as the most important predictor [[31]](#references). Experience also affects trust in
the health system and whether women return for care.

### 2.5 India

India's national programmes already embed parts of this agenda. **LaQshya** (2017) aims to improve
labour-room and maternity operation-theatre quality in public facilities, with privacy, a birth
companion, freedom of position and respectful behaviour among its elements [[11]](#references).
**Dakshata** supports mentoring and quality-improvement cycles in labour rooms [[11]](#references).
**SUMAN** (2019) promises zero preventable maternal and newborn deaths and high-quality maternity
care "delivered with dignity and respect", and makes respectful maternity care part of its essential
package [[12]](#references). A gap between policy and everyday practice remains, which is where a bedside
tool can help.

## 3. What "positive birthing" means

| It is | It is not |
|---|---|
| Safe care **and** a good experience, both | Safety traded off for comfort |
| Respect, privacy, information and informed choice | Refusing necessary medical care |
| Support from a person she trusts | An obligation to have a "natural" birth |
| Comfort measures the woman may choose | Pain denial; pain relief is also her choice |
| Care that fits her culture and language | One standard script for every woman |
| Escalating promptly when something is wrong | Waiting out an emergency |

## 4. The evidence

Certainty ratings are those given by the cited reviews or noted in their summaries. "Low" means
further research is likely to change the estimate.

| Practice | What the evidence shows | Certainty and caveats |
|---|---|---|
| **Continuous support in labour** (a companion, doula or midwife) | More spontaneous vaginal births (risk ratio 1.08, 95% CI 1.04 to 1.12; 21 trials, 14,369 women) and less use of pain-relief medicine; no harms found. Largest effect with a doula and where epidurals are not routine [[4]](#references) | Low-certainty; consistent direction |
| **Drinking and eating in labour** (low-risk women) | No benefit or harm of restricting food and fluids (5 trials, 3,130 women); women should be free to eat and drink as they wish [[13]](#references). WHO recommends oral intake for low-risk women [[1]](#references) | WHO rates the certainty very low; practice often still restricts intake [[14]](#references) |
| **Upright and mobile positions in the first stage** | The 2013 review found the first stage about 1 hour 22 minutes shorter with upright positions, with no added risk to mother or baby [[15]](#references). WHO supports a woman's free choice of position [[1]](#references). NICE advises any comfortable position except lying flat on the back [[16]](#references) | Some other reviews are more cautious about effects on duration |
| **Relaxation, breathing, yoga and music for labour pain** | May help pain and a sense of control; low to very low certainty [[5]](#references). A 2020 meta-analysis of 14 trials (1,310 women) found music may reduce anxiety [[17]](#references); a 2025 meta-analysis found pain reductions but no clear anxiety effect in some phases [[18]](#references) | Small trials, risk of bias; not a treatment |
| **Massage and manual methods** | Low-quality evidence that massage reduces pain intensity in the first stage [[6]](#references) | Low certainty |
| **Hypnosis and self-hypnosis** | Women taught self-hypnosis may need less pain relief and be more satisfied [[19]](#references) | Evidence is limited; older review |
| **Skin-to-skin contact straight after birth** | Immediate or early contact probably increases exclusive breastfeeding and helps stabilise the baby's temperature and blood sugar [[20]](#references) | The 2025 review is for healthy full-term and late-preterm babies |
| **Antenatal exercise and pelvic-floor training** | WHO advises staying active in pregnancy to limit weight gain and prevent low back and pelvic pain [[21]](#references)[[22]](#references). A meta-analysis suggests pelvic-floor exercise may shorten the second stage and reduce severe tears, but trials are mixed and often low-adherence [[23]](#references) | Needs screening for contraindications; mixed trials |
| **Respectful, dignified care** | A human-rights and quality standard in its own right [[9]](#references)[[24]](#references); disrespect is common worldwide [[8]](#references) | Strongest as an ethical standard, measured by experience scales |

**What the evidence does not show:** that any of these practices replaces skilled clinical care, or
that they make a high-risk labour safe. The BetterBirth trial in Uttar Pradesh, covering 120
facilities, found that a coaching-based WHO Safe Childbirth Checklist programme improved staff
practices but did **not** significantly reduce maternal or perinatal mortality [[25]](#references). Better
checklists and guidance help most when they are used, and when the whole system supports them.

## 5. Common practices in a positive-birthing labour room

| Practice | What it looks like at the bedside | Needs |
|---|---|---|
| **Respectful, private care** | Greet her by name, explain what you are doing, draw the curtain, keep the room calm and uncrowded | Training, space, time |
| **Companion of choice** | A person she trusts stays throughout labour and birth, and is shown how to help | Policy, a place for the companion |
| **Clear communication and consent** | Plain words in her language; ask what she needs; check she understood | Language access |
| **Eating and drinking** | Offer sips and light food to low-risk women; her appetite leads | A reminder and a protocol |
| **Movement and position of her choice** | Walking, rocking, kneeling, squatting, hands and knees; no routine bed rest | Space, mats, a birth ball if available |
| **Comfort without drugs** | Breathing, relaxation, massage by the companion, warm compress, music, calm lighting | Short training, simple tools |
| **Informed choice about intervention** | Explain options and reasons; avoid routine interventions that lack an indication | Clinical protocols |
| **Skin-to-skin and early feeding** | Baby on mother's chest right after birth, kept together | Routine and staffing |
| **Knowing when to escalate** | Warning signs are explained and acted on quickly | Referral pathways |

Several of these appear in practice at hospitals that have set out to make birth respectful. For
example, **Fernandez Hospital** in Hyderabad opened a dedicated birthing suite in 2019 [[26]](#references), its
managing director has spoken on dignity in birth [[27]](#references), and its clinicians have published
an observational study on eating in labour among low-risk women [[28]](#references).

## 6. Global guidelines and standards

| Document | Publisher, year | Why it matters here |
|---|---|---|
| **Intrapartum care for a positive childbirth experience** | WHO, 2018 | The central guideline: a global model of woman-centred intrapartum care. Brings together new and existing recommendations [[1]](#references)[[2]](#references)[[29]](#references) |
| **Maternal and newborn care for a positive postnatal experience** | WHO, 2022 | The postnatal counterpart; a positive postnatal experience for every woman and baby [[30]](#references) |
| **Antenatal care for a positive pregnancy experience** | WHO, 2016 | Includes advice on physical activity and healthy lifestyle in pregnancy [[21]](#references) |
| **Prevention and elimination of disrespect and abuse during facility-based childbirth** | WHO, 2014 | Respect as a right [[9]](#references) |
| **Standards for improving quality of maternal and newborn care in health facilities** | WHO, 2016 | Quality has two dimensions, provision and *experience* of care; includes emotional support and a companion of choice [[24]](#references) |
| **Intrapartum care (NG235)** | NICE, UK, 2023 | Companion of choice, any comfortable position, support and hydration with effective pain relief [[16]](#references) |
| **LaQshya, Dakshata, SUMAN** | Ministry of Health and Family Welfare, India | National labour-room quality and respectful-care programmes [[11]](#references)[[12]](#references) |
| **WHO Safe Childbirth Checklist** | WHO | A checklist of essential practices; evidence of improved practice but not of lower mortality in one large trial [[25]](#references) |

WHO's 2018 guideline contains 56 recommendations, 26 of them new and 30 incorporated from earlier
WHO guidance [[29]](#references). Its care model covers respectful care, emotional support by a companion of choice,
effective communication, pain relief, labour monitoring, oral fluid and food, mobility and position,
a referral plan and continuity of care.

## 7. Challenges

- **Knowledge to practice.** Guidelines are long; the bedside is busy. Even where oral intake is
  recommended, providers often still restrict it [[14]](#references).
- **Workload and space.** Respect and companionship take time, privacy and a place to stand.
- **Evidence gaps.** Many comfort practices have low-certainty evidence, so claims must be modest.
- **Culture and language.** Practices must suit the woman's context, and be understood in her language.
- **Measuring experience.** Mortality is easy to count; dignity and satisfaction are not.
- **Safety.** Comfort tools must never delay escalation of care.

## 8. How Positive Birthing Companion applies this

| Module | Practice it supports | Basis |
|---|---|---|
| **Hydration** | A gentle reminder to offer sips at a facility-set interval, and an optional temperature and pulse check that prompts assessment (never a diagnosis) | WHO oral-intake recommendation [[1]](#references), Cochrane [[13]](#references) |
| **Sound & Calm** | Comfort music (content coming once licensed tracks are available) | Music reviews [[17]](#references)[[18]](#references) |
| **Move & Ease** | Breathing, relaxation, labour positions, antenatal stretches (linked CC BY videos, pending clinical review) | Relaxation, positions and antenatal-care evidence [[5]](#references)[[15]](#references)[[21]](#references) |
| **Learn** | Ten short, sourced practice cards for staff, mothers and companions | WHO 2018 care model, Cochrane, LaQshya [[1]](#references)[[4]](#references)[[11]](#references) |
| **Language** | 13 Indian languages, right-to-left support | Communication and equity [[1]](#references) |

The app **supports, never replaces, clinical judgement**. It uses no AI. Every clinical item passes a
clinical review before release (see [QA_PROCESS.md](../QA_PROCESS.md)), and the hydration thresholds
shown today are **samples awaiting clinical validation**.

## 9. Open questions

- Which comfort practices do nurses in Indian labour rooms find feasible, and which do mothers find helpful?
- Does a bedside reminder change how often low-risk women are offered fluids?
- Which languages and cultural adaptations matter most?
- How should experience be measured with minimal burden and without collecting personal data?

## References

Links were checked on 2026-11-03 (all returned a page except suman.mohfw.gov.in, which was unreachable). Several sources were read through official summaries rather than the full text.

1. WHO. *WHO recommendations: intrapartum care for a positive childbirth experience*. 2018. <https://www.who.int/publications/i/item/9789241550215>
2. WHO. *Making childbirth a positive experience* (news release, 15 February 2018). <https://www.who.int/news/item/15-02-2018-making-childbirth-a-positive-experience>
3. Maternal Health Task Force (Harvard Chan School). *New intrapartum care guideline from WHO focuses on a positive childbirth experience*. <https://www.mhtf.org/?p=44587>
4. Cochrane. *Continuous support for women during childbirth* (CD003766). <https://www.cochrane.org/evidence/CD003766/continuous-support-women-during-childbirth>
5. Smith CA et al. *Relaxation techniques for pain management in labour*. Cochrane, 2018 (CD009514). <https://www.cochrane.org/evidence/CD009514_relaxation-techniques-pain-management-labour>
6. Smith CA et al. *Massage, reflexology and other manual methods for pain management in labour*. Cochrane, 2018 (CD009290). <https://www.cochrane.org/CD009290/PREG_massage-reflexology-and-other-manual-methods-managing-pain-labour>
7. Downe S, Finlayson K, Oladapo O, Bonet M, Gülmezoglu AM. *What matters to women during childbirth: a systematic qualitative review*. PLOS ONE 2018;13(4):e0194906. <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5903648/>
8. Bohren MA et al. *The mistreatment of women during childbirth in health facilities globally: a mixed-methods systematic review*. PLOS Medicine 2015;12(6):e1001847. <https://doi.org/10.1371/journal.pmed.1001847>
9. WHO. *The prevention and elimination of disrespect and abuse during facility-based childbirth*. 2014 (WHO/RHR/14.23). <https://www.who.int/publications/i/item/WHO-RHR-14.23>
10. Yildiz PD, Ayers S, Phillips L. *The prevalence of posttraumatic stress disorder in pregnancy and after birth: a systematic review and meta-analysis*. Journal of Affective Disorders 2017;208:634-645. <https://openaccess.city.ac.uk/id/eprint/15947/>
11. NHSRC / MoHFW. *LaQshya and Dakshata: labour room quality improvement resources*. <https://qps.nhsrcindia.org/sites/default/files/2024-08/Revised%20QI%20Cycles%20Laqshya%20resource%20material.pdf> and the LaQshya guideline <https://nhm.hp.gov.in/storage/app/media/uploaded-files/LaQshya%20Guidelines%20.pdf>
12. MoHFW. *SUMAN: Surakshit Matritva Aashwasan, Guidelines 2020*. <https://www.nhsrcindia.org/sites/default/files/2021-06/2.SUMAN%20Guidelines_2020.pdf> (programme site: suman.mohfw.gov.in)
13. Singata M et al. *Restricting oral fluid and food intake during labour*. Cochrane (CD003930). <https://www.cochrane.org/CD003930/PREG_eating-and-drinking-in-labour> and <https://pubmed.ncbi.nlm.nih.gov/20091553/>
14. *"We restrict certain things": provider adherence to WHO's recommendation on oral intake in labour, Greater Accra, Ghana*. BMC Pregnancy and Childbirth 2024. <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11138096/>
15. Lawrence A et al. *Maternal positions and mobility during first stage labour*. Cochrane, 2013 (CD003934). <https://www.cochrane.org/evidence/CD003934_mothers-position-during-first-stage-labour>
16. NICE. *Intrapartum care* (NG235), 2023. <https://www.nice.org.uk/guidance/ng235>
17. *Music therapy in pain and anxiety management during labor: a systematic review and meta-analysis*. 2020. <https://pubmed.ncbi.nlm.nih.gov/33050409/>
18. *Music in labour: 2025 meta-analysis of nine randomised trials*. <https://pmc.ncbi.nlm.nih.gov/articles/PMC12065334/>
19. Smith CA et al. *Complementary and alternative therapies for pain management in labour*. Cochrane (CD003521). <https://www.cochrane.org/evidence/CD003521_complementary-and-alternative-therapies-pain-management-labour>
20. Moore ER et al. *Immediate or early skin-to-skin contact for mothers and their healthy newborn infants*. Cochrane, 2025 (CD003519). <https://www.cochrane.org/CD003519/PREG_early-skin-skin-contact-mothers-and-their-healthy-newborn-infants>
21. WHO. *Antenatal care for a positive pregnancy experience*. 2016. <https://www.who.int/news/item/07-11-2016-new-guidelines-on-antenatal-care-for-a-positive-pregnancy-experience> (PDF: <https://www.who.int/docs/default-source/reproductive-health/maternal-health/anc.pdf?sfvrsn=5e2c740e_2>)
22. WHO. *Guidelines on physical activity and sedentary behaviour*. 2020. <https://iris.who.int/server/api/core/bitstreams/faa83413-d89e-4be9-bb01-b24671aef7ca/content>
23. Sobhgol SS et al. Antenatal pelvic-floor muscle exercise meta-analysis, and a randomised trial of antenatal pelvic-floor exercises and labour outcomes. <https://researchers.westernsydney.edu.au/en/publications/the-effect-of-antenatal-pelvic-floor-muscle-exercises-on-labour-a/> and <https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12346635/>
24. WHO. *Standards for improving quality of maternal and newborn care in health facilities*. 2016. <https://www.who.int/publications/i/item/9789241511216>
25. Semrau KEA et al. *Outcomes of a coaching-based WHO Safe Childbirth Checklist program in India*. New England Journal of Medicine 2017. <https://pubmed.ncbi.nlm.nih.gov/29236628/>
26. Fernandez Hospital. *Dr. Lourdes C. Fernandez Birthing Suite* (2019). <https://www.fernandezhospital.com/blogs/dr-lourdes-c-fernandez-birthing-suite>
27. Fernandez E. *Natural birthing: a promise of dignity in birth* (TEDx talk). <https://www.ted.com/talks/dr_evita_fernandez_natural_birthing_a_promise_of_dignity_in_birth>
28. *Oral hydration and food during labour: is restriction necessary?* Indian Journal of Nutrition and Dietetics (Fernandez Hospital Foundation). <https://informaticsjournals.com/index.php/ijnd/article/view/25762>
29. Lamaze International. *WHO releases new intrapartum care guidelines*. <https://lamaze.org/Connecting-the-Dots/World-Health-Organization-Releases-New-Intrapartum-Care-Guidelines-and-They-ROCK>
30. WHO. *WHO recommendations on maternal and newborn care for a positive postnatal experience*. 2022. <https://www.who.int/publications/i/item/9789240045989>
31. Dekel S, Stuebe C, Dishy G. *Childbirth induced posttraumatic stress syndrome: a systematic review of prevalence and risk factors*. Frontiers in Psychology 2017;8:560. <https://www.frontiersin.org/articles/10.3389/fpsyg.2017.00560/full>

Further reading collected for this project: [research/positive-birth-evidence.md](../research/positive-birth-evidence.md).
