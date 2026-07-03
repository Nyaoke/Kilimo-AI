/**
 * Kilimo AI knowledge base seed data.
 * Production would need 500+ agronomist-reviewed entries; this set proves the pattern.
 */
import type { SeedEntry } from "@/types";

export const KB_SEED: SeedEntry[] = [
  {
    topic: "maize_planting_timing",
    crop: "maize",
    question_en: "When should I plant maize for the long rains in Kenya?",
    question_sw: "Ni lini nikapande mahindi kwa mvua kubwa?",
    answer_en:
      "For the long rains, plant maize when soil moisture is reliable, typically from mid-March through April in most highland and medium-altitude zones. Wait until the top 5 cm of soil is moist after the first sustained rains. In drier lowland areas, confirm local onset dates with your extension officer before planting.",
    answer_sw:
      "Kwa mvua kubwa, panda mahindi wakati udongo una unyevu wa kutosha, kwa kawaida kuanzia katikati ya Machi hadi Aprili katika maeneo mengi ya juu na wastani. Subiri hadi sentimita 5 za juu za udongo ziwe na unyevu baada ya mvua za kwanza. Katika maeneo kame ya chini, thibitisha tarehe za kuanza kwa mvua na afisa wa kilimo wa eneo lako.",
    source_citation: "KALRO Maize Production Guidelines, 2022",
  },
  {
    topic: "maize_spacing",
    crop: "maize",
    question_en: "What is the recommended maize spacing for smallholders?",
    question_sw: "Ni umbali gani unaopendekezwa kati ya mimea ya mahindi?",
    answer_en:
      "A common recommendation is 75 cm between rows and 25 cm between plants, with one seed per hole, giving roughly 53,000 plants per hectare. Adjust spacing to your soil fertility and rainfall: tighter spacing on fertile soils, wider on poor or dry soils. Confirm the best spacing for your variety with your local extension officer.",
    answer_sw:
      "Mapendekezo ya kawaida ni sentimita 75 kati ya mistari na sentimita 25 kati ya mimea, mbegu moja kwa shimo, takriban mimea 53,000 kwa hekta. Rekebisha umbali kulingana na rutuba ya udongo na mvua: umbali mdogo kwenye udongo wenye rutuba, mkubwa kwenye udongo duni au kame. Thibitisha umbali bora kwa aina yako na afisa wa kilimo wa eneo lako.",
    source_citation: "KALRO Maize Production Guidelines, 2022",
  },
  {
    topic: "maize_topdressing",
    crop: "maize",
    question_en: "When and how should I top-dress maize with fertilizer?",
    question_sw: "Ni lini na jinsi gani ninyunyizie mbolea mahindi yangu?",
    answer_en:
      "Top-dress maize with Calcium Ammonium Nitrate (CAN) when plants reach knee height, about 4 to 6 weeks after emergence. Apply in a band along the row, keeping fertilizer off the leaves. The exact rate depends on your soil test; consult your local agricultural extension officer for the right amount for your field.",
    answer_sw:
      "Nyunyizia mahindi Calcium Ammonium Nitrate (CAN) mimea inapofikia urefu wa goti, takriban wiki 4 hadi 6 baada ya kuchipuka. Weka kwenye mstari kando ya safu, epuka kuweka mbolea kwenye majani. Kiasi halisi kinategemea uchunguzi wa udongo; wasiliana na afisa wa kilimo wa eneo lako kwa kiasi sahihi kwa shamba lako.",
    source_citation: "KALRO Maize Production Guidelines, 2022",
  },
  {
    topic: "maize_fall_armyworm",
    crop: "maize",
    question_en: "How do I identify and control fall armyworm in maize?",
    question_sw: "Ninawezaje kutambua na kudhibiti viwavijeshi kwenye mahindi?",
    answer_en:
      "Fall armyworm larvae have a distinctive inverted Y on the head and four dark spots on the last body segment. They feed inside the whorl, leaving ragged holes and frass. Scout fields weekly from 2 weeks after emergence. Push-pull systems using desmodium and Napier grass can reduce damage. For chemical control, consult your extension officer for approved products and rates for your area.",
    answer_sw:
      "Vikundi vya viwavijeshi vina alama ya Y iliyogeuzwa kichwani na vidokezo vinne vyeusi mwishoni mwa mwili. Hula ndani ya shina, kuacha mashimo na kinyesi. Chunguza shamba kila wiki kuanzia wiki 2 baada ya kuchipuka. Mfumo wa push-pull kwa desmodium na nyasi ya Napier unaweza kupunguza uharibifu. Kwa dawa za kuua wadudu, wasiliana na afisa wa kilimo kwa bidhaa na viwango vilivyoidhinishwa kwa eneo lako.",
    source_citation: "CABI Plantwise: Fall Armyworm on Maize factsheet",
  },
  {
    topic: "maize_lethal_necrosis",
    crop: "maize",
    question_en: "What are the symptoms of maize lethal necrosis (MLN)?",
    question_sw: "Dalili za ugonjwa wa maize lethal necrosis (MLN) ni zipi?",
    answer_en:
      "Maize lethal necrosis shows as yellowing and necrotic streaking on leaves, stunted plants, and failure to set ears. It is caused by co-infection of maize chlorotic mottle virus and sugarcane mosaic virus, spread by thrips and leafhoppers. Use certified MLN-tolerant seed and rogue out infected plants early. Report suspected cases to your extension officer.",
    answer_sw:
      "Maize lethal necrosis huonyeshwa na majani kugeuka manjano na mistari ya kuoza, mimea kukua polepole, na kushindwa kuzaa masigara. Husababishwa na maambukizi ya virusi ya maize chlorotic mottle na sugarcane mosaic, yanayosambazwa na wadudu. Tumia mbegu zilizothibitishwa zenye ustahimilivu wa MLN na ondoa mimea iliyoambukizwa mapema. Ripoti kesi zinazoshukiwa kwa afisa wa kilimo.",
    source_citation: "KALRO Maize Production Guidelines, 2022",
  },
  {
    topic: "maize_striga",
    crop: "maize",
    question_en: "How can I manage Striga (witchweed) in my maize field?",
    question_sw: "Ninawezaje kudhibiti Striga (kiduha) kwenye shamba la mahindi?",
    answer_en:
      "Striga is a parasitic weed that attaches to maize roots and causes stunting and wilting. Push-pull intercropping with desmodium between maize rows and Napier grass as a border crop suppresses Striga. Crop rotation with non-host crops like soybeans also helps. For herbicide options, consult your extension officer for products approved in Kenya.",
    answer_sw:
      "Striga ni mwiba anayejishikilia mizizi ya mahindi na kusababisha mimea kukua polepole na kunyauka. Kupanda kwa mfumo wa push-pull kwa desmodium kati ya mistari ya mahindi na nyasi ya Napier kama mpaka husaidia kuzuia Striga. Kuzungusha mazao na mazao yasiyo mwenyeji kama soya pia husaidia. Kwa chaguo za dawa za kuua magugu, wasiliana na afisa wa kilimo kwa bidhaa zilizoidhinishwa Kenya.",
    source_citation: "CABI Plantwise: Striga Management factsheet",
  },
  {
    topic: "maize_drying_storage",
    crop: "maize",
    question_en: "How should I dry and store maize after harvest?",
    question_sw: "Ninapaswa kukaushaje na kuhifadhije mahindi baada ya kuvuna?",
    answer_en:
      "Dry shelled maize to about 13 percent moisture before storage. Sun-dry on a raised platform or tarpaulin, turning regularly. Store in clean, dry containers or hermetic bags once grain is cool and dry. Inspect stored grain monthly for weevils or mould. If moisture is uncertain, use a moisture meter or ask your extension officer to test.",
    answer_sw:
      "Kausha mahindi yaliyotolewa maganda hadi unyevu wa takriban asilimia 13 kabla ya kuhifadhi. Kausha jua kwenye jukwaa au turubai, ukigeuza mara kwa mara. Hifadhi katika vyombo safi na kavu au mifuko ya hermetic mara nafaka ikapoa na kukausha. Chunguza nafaka kila mwezi kwa wadudu au ukungu. Ikiwa unyevu haujulikani, tumia kipimo cha unyevu au muulize afisa wa kilimo kupima.",
    source_citation: "FAO Post-harvest Management Guidelines for Maize",
  },
  {
    topic: "maize_aflatoxin",
    crop: "maize",
    question_en: "How do I prevent aflatoxin in stored maize?",
    question_sw: "Ninawezaje kuzuia sumu ya aflatoxin kwenye mahindi yaliyohifadhiwa?",
    answer_en:
      "Aflatoxin is produced by Aspergillus mould on damp grain. Prevent it by drying maize thoroughly to 13 percent moisture, storing only clean dry grain, and keeping storage areas well ventilated. Discard mouldy or discoloured cobs. Never feed visibly mouldy grain to livestock. If you suspect contamination, contact your extension officer or local grain buyer for testing.",
    answer_sw:
      "Aflatoxin hutengenezwa na ukungu wa Aspergillus kwenye nafaka yenye unyevu. Zuia kwa kukausha mahindi vizuri hadi unyevu wa asilimia 13, kuhifadhi nafaka safi na kavu tu, na kuweka sehemu za kuhifadhi zenye hewa nzuri. Tupa masigara yenye ukungu au rangi isiyo ya kawaida. Usilishie mifugo nafaka yenye ukungu unaoonekana. Ukishuku uchafuzi, wasiliana na afisa wa kilimo au mnunuzi wa nafaka kwa kupima.",
    source_citation: "FAO Aflatoxin Management in Smallholder Storage",
  },
  {
    topic: "beans_intercropping",
    crop: "beans",
    question_en: "Can I intercrop beans with maize, and how?",
    question_sw: "Naweza kupanda maharagwe pamoja na mahindi, na jinsi gani?",
    answer_en:
      "Yes, beans and maize intercropping is common in Kenya. Plant beans between maize rows 2 to 3 weeks after maize emergence, using a climbing or bushy variety suited to your zone. Beans fix nitrogen, which benefits the maize. Ensure beans get enough light: do not plant too late when maize canopy closes. Choose varieties recommended for your altitude.",
    answer_sw:
      "Ndiyo, kupanda maharagwe pamoja na mahindi ni kawaida Kenya. Panda maharagwe kati ya mistari ya mahindi wiki 2 hadi 3 baada ya mahindi kuchipuka, ukitumia aina ya kupanda au ya kichaka inayofaa eneo lako. Maharagwe yanaweka nitrojeni, yanayonufaisha mahindi. Hakikisha maharagwe yanapata mwanga wa kutosha: usipande kwa kuchelewa wakati kivuli cha mahindi kinapofunga. Chagua aina zinazopendekezwa kwa urefu wa eneo lako.",
    source_citation: "One Acre Fund: Beans and Maize Intercropping Guide",
  },
  {
    topic: "beans_anthracnose",
    crop: "beans",
    question_en: "What are the symptoms of bean anthracnose?",
    question_sw: "Dalili za ugonjwa wa anthracnose kwenye maharagwe ni zipi?",
    answer_en:
      "Bean anthracnose causes dark, sunken lesions on pods, stems, and leaves, often with pink spore masses in wet weather. Infected seed is a major source of spread. Use certified disease-free seed, avoid working in wet fields, and rotate beans with non-legume crops. For fungicide options, consult your extension officer.",
    answer_sw:
      "Anthracnose ya maharagwe husababisha vidonda vyeusi vilivyozama kwenye maganda, shina, na majani, mara nyingi na makundi ya spores waridi wakati wa mvua. Mbegu iliyoambukizwa ni chanzo kikuu cha kuenea. Tumia mbegu zisizo na magonjwa, epuka kufanya kazi shambani mvua iwapo, na zungusha maharagwe na mazao yasiyo na jamii ya kunde. Kwa dawa za kuua ukungu, wasiliana na afisa wa kilimo.",
    source_citation: "CABI Plantwise: Bean Anthracnose factsheet",
  },
  {
    topic: "beans_harvest",
    crop: "beans",
    question_en: "When is the right time to harvest beans?",
    question_sw: "Ni lini wakati sahihi wa kuvuna maharagwe?",
    answer_en:
      "Harvest bush beans when pods are fully filled but before they turn yellow and dry on the plant, usually 60 to 75 days after planting depending on variety. For dry beans, wait until pods are dry and brittle, then thresh and dry grain to safe storage moisture. Harvest in dry weather to reduce mould risk.",
    answer_sw:
      "Vuna maharagwe ya kichaka maganda yakiwa yamejaa lakini kabla hayajageuka manjano na kukausha kwenye mmea, kwa kawaida siku 60 hadi 75 baada ya kupanda kulingana na aina. Kwa maharagwe kavu, subiri maganda yakauke na kuvunjika, kisha pura na kausha nafaka hadi unyevu salama wa kuhifadhi. Vuna wakati wa hewa kavu ili kupunguza hatari ya ukungu.",
    source_citation: "KALRO Bean Production Guidelines",
  },
  {
    topic: "potato_seed",
    crop: "potato",
    question_en: "Where should I get certified potato seed?",
    question_sw: "Ninapaswa kununua wapi mbegu za viazi zilizothibitishwa?",
    answer_en:
      "Buy certified seed potatoes from KALRO-licensed dealers or registered agro-dealers, not from the local market where disease spreads easily. Certified seed is free of major viruses and has known variety performance. Store seed tubers in a cool, shaded place until planting. Cut large tubers 1 to 2 days before planting so cuts heal.",
    answer_sw:
      "Nunua viazi vya mbegu vilivyothibitishwa kutoka kwa wauzaji wenye leseni ya KALRO au maduka ya kilimo yaliyosajiliwa, si sokoni ambapo magonjwa huenea kwa urahisi. Mbegu zilizothibitishwa hazina virusi vikuu na zina utendaji unaojulikana. Hifadhi viazi vya mbegu mahali baridi na penye kivuli hadi wakati wa kupanda. Kata viazi makubwa siku 1 hadi 2 kabla ya kupanda ili mikato ipone.",
    source_citation: "KALRO Potato Production Guidelines",
  },
  {
    topic: "potato_late_blight",
    crop: "potato",
    question_en: "How do I recognise late blight in potatoes?",
    question_sw: "Ninatambuaje ugonjwa wa late blight kwenye viazi?",
    answer_en:
      "Late blight causes dark water-soaked lesions on leaves and stems that turn brown and spread rapidly in cool wet weather. White mould may appear on leaf undersides. Tubers develop brown firm rot. Remove and destroy infected plants immediately. Use certified seed and avoid overhead irrigation in the evening. For fungicide programmes, consult your extension officer.",
    answer_sw:
      "Late blight husababisha vidonda vyeusi vilivyolowa maji kwenye majani na shina ambavyo hubadilika kahawia na kuenea haraka wakati wa hewa baridi na mvua. Ukungu mweupe unaweza kuonekana chini ya majani. Viazi hupata kuoza kahawia ngumu. Ondoa na uharibu mimea iliyoambukizwa mara moja. Tumia mbegu zilizothibitishwa na epuka kumwagilia juu jioni. Kwa ratiba ya dawa za kuua ukungu, wasiliana na afisa wa kilimo.",
    source_citation: "CABI Plantwise: Potato Late Blight factsheet",
  },
  {
    topic: "potato_storage",
    crop: "potato",
    question_en: "How should I store potatoes after harvest?",
    question_sw: "Ninapaswa kuhifadhije viazi baada ya kuvuna?",
    answer_en:
      "Cure potatoes for 1 to 2 weeks in a shaded, well-ventilated place after harvest so skins harden. Store in a dark, cool (4 to 8 degrees C if possible), ventilated space. Avoid light, which turns tubers green and toxic. Sort out damaged or diseased tubers before storage. In warm climates without cold storage, sell or consume within a few weeks.",
    answer_sw:
      "Ponya viazi kwa wiki 1 hadi 2 mahali penye kivuli na hewa nzuri baada ya kuvuna ili ganda lipate nguvu. Hifadhi mahali giza, baridi (digrii 4 hadi 8 ikiwezekana), na penye hewa. Epuka mwanga, unaogeuzwa viazi kuwa kijani na sumu. Chagua viazi vilivyoharibika au kuwa na magonjwa kabla ya kuhifadhi. Katika hali ya joto bila hifadhi baridi, uza au tumia ndani ya wiki chache.",
    source_citation: "FAO Post-harvest Handling of Potatoes",
  },
  {
    topic: "coffee_berry_disease",
    crop: "coffee",
    question_en: "What are the signs of coffee berry disease (CBD)?",
    question_sw: "Dalili za ugonjwa wa coffee berry disease (CBD) ni zipi?",
    answer_en:
      "Coffee berry disease causes dark sunken lesions on young green berries, which may drop prematurely. Lesions often have a dark border. It spreads in wet cool weather. Prune for good air circulation, remove infected berries from the ground, and maintain shade at recommended levels. For spray programmes, consult your extension officer for approved fungicides.",
    answer_sw:
      "Coffee berry disease husababisha vidonda vyeusi vilivyozama kwenye zabibu za kahawa za kijani, ambazo zinaweza kuanguka mapema. Vidonda mara nyingi vina mpaka mweusi. Huenea wakati wa hewa baridi na mvua. Pogoa ili kuweka mzunguko wa hewa, ondoa zabibu zilizoambukizwa kutoka ardhini, na udumishe kivuli kwa kiwango kinachopendekezwa. Kwa ratiba ya kunyunyiza, wasiliana na afisa wa kilimo kwa dawa za kuua ukungu zilizoidhinishwa.",
    source_citation: "KALRO Coffee Research Institute: CBD Management",
  },
  {
    topic: "coffee_pruning",
    crop: "coffee",
    question_en: "When and how should I prune my coffee bushes?",
    question_sw: "Ni lini na jinsi gani nipogoe miti yangu ya kahawa?",
    answer_en:
      "Prune coffee after the main harvest to remove dead, diseased, and unproductive branches. Maintain 2 to 3 main stems per stump for good light penetration. Remove suckers growing from below the graft union. Heavy pruning is best done at the start of the rains so plants recover quickly. Follow the pruning calendar recommended for your coffee zone.",
    answer_sw:
      "Pogoa kahawa baada ya mavuno makuu kuondoa matawi yaliyokufa, yaliyo na magonjwa, na yasiyotoa mavuno. Dumisha shina 2 hadi 3 kwa kikole kwa kupenya kwa mwanga. Ondoa machipukizi yanayokua chini ya muungano wa kuokota. Kupogoa kwa ukali ni bora mwanzoni mwa mvua ili mimea ipone haraka. Fuata kalenda ya kupogoa inayopendekezwa kwa eneo lako la kahawa.",
    source_citation: "KALRO Coffee Research Institute: Pruning Guide",
  },
  {
    topic: "tea_plucking",
    crop: "tea",
    question_en: "How often should I pluck tea leaves?",
    question_sw: "Ni mara ngapi nipaswa kuchuma majani ya chai?",
    answer_en:
      "Pluck tea on a 7 to 14 day round, taking two leaves and a bud from each shoot. Shorter rounds during the rains when growth is fast; longer rounds in dry periods. Never pluck below the maintenance table height. Regular plucking encourages new flush and maintains bush productivity.",
    answer_sw:
      "Chuma chai kila siku 7 hadi 14, ukichukua majani mawili na chipukizi kutoka kila shina. Mizunguko mifupi wakati wa mvua ukuaji wa haraka; mizunguko mirefu wakati wa ukame. Usichume chini ya urefu wa meza ya matengenezo. Kuchuma mara kwa mara kunachochea chipukizi mpya na kudumisha uzalishaji wa kichaka.",
    source_citation: "KALRO Tea Research Institute: Plucking Standards",
  },
  {
    topic: "tea_pests",
    crop: "tea",
    question_en: "What are common pests on tea in Kenya?",
    question_sw: "Wadudu wa kawaida kwenye chai Kenya ni wapi?",
    answer_en:
      "Common tea pests include tea mosquito bug (Helopeltis), red spider mites, and thrips, which cause leaf distortion, brown spots, and reduced quality. Scout bushes weekly. Maintain good shade and hygiene. Biological and chemical controls exist but product choice depends on your estate and certification status. Consult your extension officer before spraying.",
    answer_sw:
      "Wadudu wa kawaida wa chai ni mdudu wa mbu wa chai (Helopeltis), virojo vyeupe, na thrips, husababisha majani kupotoka, madoa kahawia, na kupunguza ubora. Chunguza vichaka kila wiki. Dumisha kivuli na usafi vizuri. Udhibiti wa kibiolojia na wa kemikali upo lakini chaguo la bidhaa linategemea shamba lako na hali ya uthibitisho. Wasiliana na afisa wa kilimo kabla ya kunyunyiza.",
    source_citation: "KALRO Tea Research Institute: Pest Management",
  },
  {
    topic: "dairy_mastitis",
    crop: "dairy",
    question_en: "How can I prevent mastitis in my dairy cows?",
    question_sw: "Ninawezaje kuzuia mastitis kwa ng'ombe wangu wa maziwa?",
    answer_en:
      "Prevent mastitis by milking with clean dry hands and equipment, dipping teats after every milking, and keeping bedding dry and clean. Separate cows with clinical mastitis immediately. Test milk regularly using a California Mastitis Test if available. Treat only under veterinary guidance; do not discard antibiotic withdrawal periods.",
    answer_sw:
      "Zuia mastitis kwa kumaliza maziwa kwa mikono na vifaa safi na kavu, kuzamisha chuchu baada ya kila kumaliza, na kuweka kitanda kikavu na safi. Tenga ng'ombe wenye mastitis ya kliniki mara moja. Pima maziwa mara kwa mara kwa California Mastitis Test ikiwa inapatikana. Tiba chini ya mwongozo wa daktari wa mifugo tu; usipuuze kipindi cha kusubiri baada ya dawa.",
    source_citation: "Kenya Dairy Board: Mastitis Prevention Guidelines",
  },
  {
    topic: "dairy_fodder",
    crop: "dairy",
    question_en: "What fodder options are good for dairy cows in Kenya?",
    question_sw: "Chakula gani cha majani kinafaa kwa ng'ombe wa maziwa Kenya?",
    answer_en:
      "Napier grass (Pakistan or Bana varieties) is the most common basal fodder. Supplement with desmodium, calliandra, or leucaena for protein. Silage maize or sorghum for dry-season feeding. Ensure clean water at all times. Balance roughage with a mineral lick; consult your extension officer or vet for ration formulation.",
    answer_sw:
      "Nyasi ya Napier (aina za Pakistan au Bana) ni chakula cha msingi kinachotumika zaidi. Ongeza desmodium, calliandra, au leucaena kwa protini. Silaji ya mahindi au mtama kwa kulisha wakati wa ukame. Hakikisha maji safi kila wakati. Linganisha chakula cha maganda na chumvi ya madini; wasiliana na afisa wa kilimo au daktari wa mifugo kwa ratiba ya chakula.",
    source_citation: "Kenya Dairy Board: Fodder Production Guide",
  },
  {
    topic: "dairy_calf",
    crop: "dairy",
    question_en: "How should I care for a newborn dairy calf?",
    question_sw: "Ninapaswa kumtunzaje ndama mpya wa ng'ombe wa maziwa?",
    answer_en:
      "Ensure the calf receives colostrum within the first 2 to 4 hours of birth, at least 2 litres in the first day. Keep the calf in a clean dry pen, away from adult manure. Disinfect the navel with iodine. Introduce good quality hay and clean water from 1 week, and start calf starter concentrate from 2 weeks. Consult your vet for a vaccination schedule.",
    answer_sw:
      "Hakikisha ndama anapata colostrum ndani ya saa 2 hadi 4 za kuzaliwa, angalau lita 2 siku ya kwanza. Weka ndama kwenye zizi safi na kavu, mbali na mavi ya ng'ombe wakubwa. Safisha kitovu kwa iodini. Anzisha majani bora na maji safi kutoka wiki 1, na anzisha chakula cha ndama kutoka wiki 2. Wasiliana na daktari wa mifugo kwa ratiba ya chanjo.",
    source_citation: "Kenya Dairy Board: Calf Rearing Guidelines",
  },
  {
    topic: "soil_testing",
    crop: "soil",
    question_en: "Why should I test my soil before applying fertilizer?",
    question_sw: "Kwa nini nipime udongo wangu kabla ya kutumia mbolea?",
    answer_en:
      "Soil testing tells you the pH, nutrient levels, and organic matter so you apply the right fertilizer at the right rate. Over-fertilizing wastes money and can damage crops and waterways. Collect samples from 10 to 15 spots across the field at plough depth, mix, and send to a KALRO or accredited lab. Test every 2 to 3 years.",
    answer_sw:
      "Kupima udongo kunakuambia pH, viwango vya virutubisho, na mata ya kikaboni ili utumie mbolea sahihi kwa kiwango sahihi. Kutumia mbolea kupita kiasi kunapoteza pesa na kunaweza kuharibu mazao na maji. Kusanya sampuli kutoka sehemu 10 hadi 15 shambani kwa kina cha kulima, changanya, na tuma kwa maabara ya KALRO au iliyothibitishwa. Pima kila miaka 2 hadi 3.",
    source_citation: "KALRO Soil Testing and Fertility Management Guide",
  },
  {
    topic: "soil_acidity_lime",
    crop: "soil",
    question_en: "My soil is acidic. Should I apply lime?",
    question_sw: "Udongo wangu una asidi. Je, ninapaswa kutumia chokaa?",
    answer_en:
      "If soil pH is below 5.5, lime can improve nutrient availability for most crops. The amount of lime depends on your soil test results and crop needs; do not guess the rate. Apply lime 2 to 3 months before planting and incorporate it into the soil. Consult your extension officer with your soil test report for the correct lime type and quantity.",
    answer_sw:
      "Ikiwa pH ya udongo iko chini ya 5.5, chokaa kinaweza kuboresha upatikanaji wa virutubisho kwa mazao mengi. Kiasi cha chokaa kinategemea matokeo ya kupima udongo na mahitaji ya mazao; usikadirie kiwango. Tumia chokaa miezi 2 hadi 3 kabla ya kupanda na ukichanganye na udongo. Wasiliana na afisa wa kilimo na ripoti yako ya udongo kwa aina na kiasi sahihi cha chokaa.",
    source_citation: "KALRO Soil Testing and Fertility Management Guide",
  },
  {
    topic: "soil_cover_crops",
    crop: "soil",
    question_en: "What cover crops can improve my soil?",
    question_sw: "Mazao gani ya kufunika yanaweza kuboresha udongo wangu?",
    answer_en:
      "Cover crops like mucuna (velvet bean), lablab, and desmodium add organic matter, suppress weeds, and fix nitrogen. Plant at the end of the rains or between main crops. Slash and incorporate into the soil 2 to 3 weeks before planting the next crop. Choose species suited to your rainfall and rotation plan.",
    answer_sw:
      "Mazao ya kufunika kama mucuna, lablab, na desmodium huongeza mata ya kikaboni, kuzuia magugu, na kuweka nitrojeni. Panda mwishoni mwa mvua au kati ya mazao makuu. Kata na changanya na udongo wiki 2 hadi 3 kabla ya kupanda mazao yanayofuata. Chagua spishi zinazofaa mvua yako na mpango wa kuzungusha mazao.",
    source_citation: "CGIAR: Cover Crops for Smallholder Systems",
  },
  {
    topic: "weather_long_rains",
    crop: "weather",
    question_en: "When do the long rains typically start in Kenya?",
    question_sw: "Mvua kubwa huanza lini kwa kawaida Kenya?",
    answer_en:
      "The long rains (March to May season) typically begin in mid to late March in most highland and western areas, though onset varies by region and year. Farmers should prepare land early and have seed and inputs ready. Monitor Kenya Meteorological Department seasonal forecasts for your county before committing to planting dates.",
    answer_sw:
      "Mvua kubwa (msimu wa Machi hadi Mei) kwa kawaida huanza katikati hadi mwisho wa Machi katika maeneo mengi ya juu na magharibi, ingawa kuanza kunatofautiana kwa eneo na mwaka. Wakulima wanapaswa kuandaa shamba mapema na kuwa na mbegu na pembejeo tayari. Fuata utabiri wa msimu wa Idara ya Meteorolojia Kenya kwa kaunti yako kabla ya kuamua tarehe za kupanda.",
    source_citation: "Kenya Meteorological Department Seasonal Outlook",
  },
  {
    topic: "weather_drought",
    crop: "weather",
    question_en: "What should I do if drought hits during the growing season?",
    question_sw: "Nifanye nini ukikumba ukame wakati wa msimu wa kukua?",
    answer_en:
      "During drought, prioritize water for critical growth stages: germination, flowering, and grain fill. Mulch around plants to conserve moisture. Consider drought-tolerant varieties for the next season. Reduce planting area rather than planting full area with no moisture. Seek early warning from local meteorological services and extension officers.",
    answer_sw:
      "Wakati wa ukame, tanguliza maji kwa hatua muhimu za ukuaji: kuchipua, kua, na kujaza nafaka. Funika udongo karibu na mimea kuhifadhi unyevu. Fikiria aina zenye ustahimilivu wa ukame kwa msimu ujao. Punguza eneo la kupanda badala ya kupanda eneo lote bila unyevu. Tafuta onyo la mapema kutoka huduma za meteorolojia na afisa wa kilimo wa eneo.",
    source_citation: "Kenya Meteorological Department Drought Contingency Guidance",
  },
  {
    topic: "postharvest_hermetic_bags",
    crop: "postharvest",
    question_en: "How do hermetic storage bags work for grain?",
    question_sw: "Mifuko ya hermetic inafanyaje kazi kwa kuhifadhi nafaka?",
    answer_en:
      "Hermetic bags (such as PICS bags) are airtight, so insects inside use up oxygen and die without chemicals. Dry grain to 13 percent moisture first, then seal in the inner bag, pressing out air. Store bags off the ground on pallets. Inspect periodically for tears. One bag can protect grain for several months in good conditions.",
    answer_sw:
      "Mifuko ya hermetic (kama mifuko ya PICS) haina mianya, hivyo wadudu ndani hutumia oksijeni na kufa bila kemikali. Kausha nafaka hadi unyevu wa asilimia 13 kwanza, kisha funga kwenye mfuko wa ndani, ukisukuma hewa nje. Weka mifuko juu ya ardhi kwenye paleti. Chunguza mara kwa mara kwa machozi. Mfuko mmoja unaweza kulinda nafaka kwa miezi kadhaa katika hali nzuri.",
    source_citation: "PICS Hermetic Storage Research, Purdue University",
  },
  {
    topic: "postharvest_market_timing",
    crop: "postharvest",
    question_en: "When is the best time to sell my maize after harvest?",
    question_sw: "Ni lini wakati bora wa kuuza mahindi yangu baada ya kuvuna?",
    answer_en:
      "Prices are usually lowest immediately after harvest when supply is high. If you can store safely, selling 2 to 4 months later often brings better prices. Factor in storage costs, moisture loss, and pest risk. Use warehouse receipt systems where available. Never sell mouldy grain; it may be rejected or fetch very low prices.",
    answer_sw:
      "Bei kwa kawaida huwa chini mara tu baada ya kuvuna wakati ugavi ni mkubwa. Ukiweza kuhifadhi salama, kuuza miezi 2 hadi 4 baadaye mara nyingi huleta bei bora. Hesabu gharama za kuhifadhi, upotevu wa unyevu, na hatari ya wadudu. Tumia mifumo ya risiti ya ghala inapopatikana. Usiuze nafaka yenye ukungu; inaweza kukataliwa au kupata bei ya chini sana.",
    source_citation: "FAO Post-harvest Marketing for Smallholders",
  },
  {
    topic: "finance_agri_loan",
    crop: "finance",
    question_en: "What should I ask before taking an agricultural loan?",
    question_sw: "Ninapaswa kuuliza nini kabla ya kuchukua mkopo wa kilimo?",
    answer_en:
      "Before taking an agri-loan, ask: What is the total cost including interest and fees? What is the repayment schedule and what happens if the crop fails? Is collateral required? Are inputs bundled, and can you choose your supplier? Compare at least two lenders. Only borrow what you can repay from expected harvest income plus a safety margin.",
    answer_sw:
      "Kabla ya kuchukua mkopo wa kilimo, uliza: Gharama jumla ni ipi pamoja na riba na ada? Ratiba ya malipo ni ipi na nini hutokea ikiwa mavuno yatashindwa? Je, dhamana inahitajika? Je, pembejeo zimeunganishwa, na unaweza kuchagua msambazaji wako? Linganisha angalau wakopeshaji wawili. Kopa tu kile unachoweza kulipa kutoka mapato ya mavuno yanayotarajiwa pamoja na akiba ya usalama.",
    source_citation: "One Acre Fund: Farmer Finance Literacy Guide",
  },
  {
    topic: "general_out_of_scope",
    crop: "general",
    question_en: "What kinds of questions can Kilimo AI answer?",
    question_sw: "Kilimo AI inaweza kujibu maswali ya aina gani?",
    answer_en:
      "Kilimo AI answers questions about Kenyan smallholder farming: crops, livestock, soil, weather, post-harvest, and farm finance. It cannot answer questions about sports, politics, general knowledge, or topics outside agriculture. Those questions are escalated to a human agronomist.",
    answer_sw:
      "Kilimo AI hujibu maswali kuhusu kilimo cha wakulima wadogo Kenya: mazao, mifugo, udongo, hali ya hewa, baada ya kuvuna, na fedha za shamba. Haiwezi kujibu maswali kuhusu michezo, siasa, ujuzi wa jumla, au mada nje ya kilimo. Maswali hayo hupelekwa kwa mtaalamu wa kilimo.",
    source_citation: "Kilimo AI System Scope Documentation",
  },
];
