const harp = require('./harp.json').globals;
const RSS = require('rss');
const moment = require('moment');
const fs = require('fs-extra');
const path = require('path');

const rootUrl = harp.root_url.production;
const categoryDir = path.join(__dirname, 'public/_categories');
const imageRootUrl = `${rootUrl}assets/images/`;
const outputFeed = 'www/rss.xml';
const mappings = [];
const feed = new RSS({
  title: harp.title,
  description: harp.description,
  feed_url: `${rootUrl}rss.xml`,
  site_url: rootUrl,
  image_url: `${imageRootUrl}${harp.slug_title}-thumb.png`,
  managingEditor: harp.author,
  pubDate: moment().format('LLLL'),
  ttl: 60
});

fs.readdirSync(categoryDir).forEach((categoryFile) => {
  const categoryName = categoryFile.replace('.json', '');
  const category = require(path.join(categoryDir, categoryFile)).index;
  category.mappings.forEach((mapping) => {
    const mappingId = mapping.title.replace(/[^\w\s]/g, '').replace(/\s/g, '-').toLowerCase();
    const mappingLink = `${rootUrl}${categoryName}/#${mappingId}`;
    const mappingImage = mapping.image || `${categoryName}.png`;
    const mappingPublishedAt = moment(mapping.added_at || moment().format('YYYYMMDD'), 'YYYYMMDD');
    mappings.push({
      title: `${mapping.paid_mapping ? 'Sponsored' : 'Free'} mapping: ${mapping.title}`,
      description: `
        <article>
          <figure style="text-align:center;">
            <img src="${imageRootUrl}${mappingImage}" title="${mapping.title}" />
            <figcaption>${mapping.title}</figcaption>
          </figure>
          <p>
            ${mapping.description}
            <br />
            Author: <b>${mapping.author}</b> | Section: <b>${category.subtitle}</b>
            <br />
            Lang: <b>${mapping.lang}</b> | Pages: <b>${mapping.pages}</b> | Year: <b>${mapping.year}</b>
          </p>
        </article>
      `,
      url: mappingLink,
      author: harp.author,
      date: mappingPublishedAt.format('ll')
    });
  });
});

const sortedMappings = mappings.sort((first, second) => {
  const a = moment(first.date, 'll').toDate().getTime();
  const b = moment(second.date, 'll').toDate().getTime();
  if (a < b) return 1;
  if (a > b) return -1;
  return 0;
});

sortedMappings.forEach(mapping => feed.item(mapping));

fs.writeFileSync(outputFeed, feed.xml());
console.log(`Generated RSS: ${outputFeed}`);
