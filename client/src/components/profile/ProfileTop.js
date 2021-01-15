import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className='profile-top bg-primary p-2'>
      <img className='round-img my-1' src={avatar} alt='' />
      <h1 className='large'>{name}</h1>
      <p className='lead'>
        {status} {company && <span> at {company}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>

      <div className='icons my-1'>
        {formatLink(website, 'fas fa-globe fa-2x')}

        {social && formatLink(social.twitter, 'fab fa-twitter fa-2x')}

        {social && formatLink(social.facebook, 'fab fa-facebook fa-2x')}

        {social && formatLink(social.linkedin, 'fab fa-linkedin fa-2x')}

        {social && formatLink(social.youtube, 'fab fa-youtube fa-2x')}

        {social && formatLink(social.instagram, 'fab fa-instagram fa-2x')}
      </div>
    </div>
  );
};

function formatLink(linkAddress, iconClass) {
  return (
    linkAddress && (
      <a
        href={linkAddress.startsWith('http') ? linkAddress : `https://${linkAddress}`}
        target='_blank'
        rel='noopener noreferrer'>
        <i className={`${iconClass}`}></i>
      </a>
    )
  );
}

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
