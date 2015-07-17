import Component from 'flarum/Component';
import icon from 'flarum/helpers/icon';
import extract from 'flarum/utils/extract';

/**
 * The `Badge` component represents a user/discussion badge, indicating some
 * status (e.g. a discussion is stickied, a user is an admin).
 *
 * A badge may have the following special props:
 *
 * - `type` The type of badge this is. This will be used to give the badge a
 *   class name of `Badge--{type}`.
 * - `icon` The name of an icon to show inside the badge.
 *
 * All other props will be assigned as attributes on the badge element.
 */
export default class Badge extends Component {
  view() {
    const attrs = Object.assign({}, this.props);
    const type = extract(attrs, 'type');
    const iconName = extract(attrs, 'icon');

    attrs.className = 'Badge Badge--' + type + ' ' + (attrs.className || '');
    attrs.title = extract(attrs, 'label');

    // Give the badge a unique key so that when badges are displayed together,
    // and then one is added/removed, Mithril will correctly redraw the series
    // of badges.
    attrs.key = attrs.className;

    return (
      <span {...attrs}>
        {iconName ? icon(iconName, {className: 'Badge-icon'}) : ''}
      </span>
    );
  }

  config(isInitialized) {
    if (isInitialized) return;

    this.$().tooltip();
  }
}
