/* WebMI town-page data. Boyne City carries the real local copy from the
   source site. The other six towns get clearly-marked [Local copy slot]
   placeholders instead of invented local detail (brief 7.5: invented
   specifics about a real town are worse than none). */

const SECTIONS = [
  { id: 'website-design', num: '01', title: 'Website Design',
    generic: 'Planning and building a new site from scratch. Page structure, layout, typography, color, imagery, and mobile responsiveness, from the first concept through launch on a live domain. Included in the monthly plan from $199, with no upfront fee. No hourly billing and no quote that changes once I see how busy your parking lot is.' },
  { id: 'small-business', num: '02', title: 'Small Business Websites',
    generic: 'A build scoped for an actual local business. Three to eight pages covering services, about, and contact. Clear information and local details instead of complicated features nobody uses. I would rather build you five pages that do their work than eleven pages you are embarrassed to have anyone read.' },
  { id: 'redesign', num: '03', title: 'Web Redesign',
    generic: 'Rebuilding the site you already have with an updated layout, current standards, and better navigation. Your content carries over or gets rewritten, and your domain and search history stay intact. Same monthly rate as a new build, and your web address stays exactly where it is.' },
  { id: 'mobile', num: '04', title: 'Mobile Optimization',
    generic: 'Adjusting the site for phones and tablets. Responsive breakpoints, touch-friendly navigation, readable type, compressed images for cellular connections, and real testing on phone-sized screens. Every site I build is mobile ready. It is not an add-on.' },
  { id: 'seo', num: '05', title: 'SEO Optimization',
    generic: 'The on-page work that lets search engines read and index your site: titles, meta descriptions, heading structure, alt text, internal linking, page speed, sitemaps, and location signals. The fundamentals and the deeper monthly work both run inside every plan.' },
  { id: 'management', num: '06', title: 'Website Management',
    generic: 'Ongoing handling of the site for you. Content edits, photo swaps, seasonal and hours updates, platform updates, and monitoring, with no logins or technical work on your end. This runs in every plan, alongside the design, hosting and search work, from $199 a month.' },
];

const ALL = ['boyne-city', 'charlevoix', 'petoskey', 'harbor-springs', 'east-jordan', 'boyne-falls', 'walloon-lake'];

/* Towns that have a live page in the build. A town only belongs here once its
   real local copy exists in this file — otherwise the "Other towns" links point
   at pages that are not deployed. Add the slug back when the copy is written. */
const SHIPPED = ['boyne-city'];

const NAMES = {
  'boyne-city': 'Boyne City', charlevoix: 'Charlevoix', petoskey: 'Petoskey',
  'harbor-springs': 'Harbor Springs', 'east-jordan': 'East Jordan',
  'boyne-falls': 'Boyne Falls', 'walloon-lake': 'Walloon Lake',
};

const COUNTIES = {
  'boyne-city': 'Charlevoix County', charlevoix: 'Charlevoix County', petoskey: 'Emmet County',
  'harbor-springs': 'Emmet County', 'east-jordan': 'Charlevoix County',
  'boyne-falls': 'Charlevoix County', 'walloon-lake': 'Emmet County',
};

const BOYNE_CITY = {
  sceneLead: 'That decision takes about eight seconds, and your website is either in it or it is not.',
  sceneParas: [
    'On a Friday evening in July, Water Street is full of people who did not plan their night before they got here. They are standing on the sidewalk with a phone out, deciding where to eat, where to get a drink, and whether the place across the street is still open.',
    'This is the thing about running a business in Boyne City. Your busiest customers are the ones who have never heard of you. They are not going to ask around. They are going to search, tap the first result that loads fast and looks legitimate, and walk in that door instead of yours.',
  ],
  local: {
    'small-business': 'A restaurant on Lake Street needs a menu that opens instantly, correct hours, and a tappable phone number. A contractor working out toward Advance needs photos of finished work, the towns served, and a form that reaches their inbox. That is genuinely the whole job.',
    redesign: 'Plenty of Boyne City businesses are running sites built eight or ten years ago by somebody who has since moved on. Those sites are usually not broken. They are just slow, hard to read on a phone, and impossible to update without tracking down a password nobody has.',
    mobile: 'Cell service around Lake Charlevoix is uneven and everyone here knows it. A visitor coming down from Boyne Mountain with two bars of signal is not going to wait while an unresized photo loads.',
    seo: 'Being found in Boyne City is a two-part problem. The website is one part. Your Google Business Profile is the other, and it is what appears in the map results when someone searches from a car on Park Street.',
    management: 'Boyne City runs on seasons. Summer hours in May, winter hours when the lifts open, a closure the week after the holidays, and Morel Festival week when everything changes. Exactly the updates that get forgotten during the weeks you are busiest.',
  },
  from: [
    'I grew up in Boyne City. I know that a good July can carry a business through a slow March, and that the version of you a visitor meets on a phone screen is doing a lot of that selling.',
    'If that version is out of date, slow, or hard to read outside, it is costing you walk-ins you will never hear about.',
  ],
};

function slot(town, topic) {
  return `[Local copy slot: two or three sentences about ${topic} that only someone who knows ${town} would write.]`;
}

export function build(key) {
  const name = NAMES[key] || NAMES['boyne-city'];
  const real = key === 'boyne-city' ? BOYNE_CITY : null;
  const nearby = SHIPPED.filter(k => k !== key).map(k => ({ key: k, name: NAMES[k], href: '/web-design-' + k }));
  return {
    name,
    hasNearby: nearby.length > 0,
    county: COUNTIES[key] || 'Northern Michigan',
    sceneLead: real ? real.sceneLead : 'That decision takes about eight seconds, and your website is either in it or it is not.',
    sceneParas: real ? real.sceneParas.map(t => ({ text: t, isSlot: false })) : [
      { text: slot(name, 'where the customers actually come from and what they are deciding when they search'), isSlot: true },
      { text: 'Your busiest customers are the ones who have never heard of you. They are not going to ask around. They are going to search, tap the first result that loads fast and looks legitimate, and walk in that door instead of yours.', isSlot: false },
    ],
    sections: SECTIONS.map(s => ({
      ...s,
      local: real && real.local[s.id] ? { text: real.local[s.id], isSlot: false }
        : (s.id === 'website-design' ? null
          : { text: slot(name, `how "${s.title.toLowerCase()}" plays out in ${name}`), isSlot: true }),
    })),
    from: real ? real.from.map(t => ({ text: t, isSlot: false })) : [
      { text: slot(name, 'your connection to the town and its seasons'), isSlot: true },
      { text: 'If the version of you a visitor meets on a phone screen is out of date, slow, or hard to read outside, it is costing you walk-ins you will never hear about.', isSlot: false },
    ],
    nearby,
  };
}
