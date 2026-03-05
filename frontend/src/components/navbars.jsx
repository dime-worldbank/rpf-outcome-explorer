import React, { useState, useContext, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import OutcomeContext from '../OutcomeContext';
import Content from './content';
import ProgressIndicator from './progressIndicator';
import {ReactComponent as VerticalNavImg} from '../assets/vertical-version1.svg';
import ClosureTrianglePng from '../assets/closure-triangle.jpg';
import focusRolesSvg from '../assets/focus-roles.svg';
import focusBottleneckSvg from '../assets/focus-bottleneck.svg';



const HOVER_ZONES = [
  {
    id: 'outcome',
    className: 'top-zone',
  },
  {
    id: 'results',
    className: 'middle-zone',
  },
  {
    id: 'policy',
    className: 'bottom-zone',
  },
];

function VerticalNavbarPermanent() {
    const [selectedItem, setSelectedItem] = useState('outcome');
    const { outcome } = useContext(OutcomeContext);
    const contentRef = useRef();



  useEffect(() => {
      const outcomeReact = document.getElementsByClassName('clickable outcome');
      if (!outcomeReact) return;
      for (let elem of outcomeReact){
          elem.classList.add('selected');
      }
  }, []);

  // Step → SVG component IDs to highlight
  const STEP_HIGHLIGHTS = {
    outcome:    ['development-outcomes'],
    results:    ['public-sector-results'],
    challenges: ['challenges'],
    policy:     ['public-policy', 'fiscal-policy-pfm', 'institutions'],
    role:       ['left-question'],
    bottleneck: ['right-question'],
  };

  const ALL_COMPONENTS = [
    'development-outcomes', 'public-sector-results', 'challenges',
    'public-policy', 'fiscal-policy-pfm', 'institutions',
    'left-question', 'right-question',
  ];

  // All three elements that make up the public-policy zone
  const POLICY_COMPONENTS = ['public-policy', 'fiscal-policy-pfm', 'institutions'];
  // Their collective bounding box in the SVG viewBox (0 0 19050 33867)
  const POLICY_BBOX = { x: '4165', y: '16218', width: '10205', height: '11804' };
  const FOCUS_OVERLAY_ID = 'focus-policy-overlay';

  // Keep SVG highlighting in sync with selectedItem
  useEffect(() => {
    // Resolve step key
    const key = selectedItem.startsWith('role') ? 'role'
              : selectedItem.startsWith('bottleneck') ? 'bottleneck'
              : selectedItem; // handles 'outcome', 'results', 'challenges', 'policy' directly

    const toHighlight = STEP_HIGHLIGHTS[key] || [];

    // Apply highlighted / dimmed classes to each component
    ALL_COMPONENTS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (toHighlight.includes(id)) {
        el.classList.add('highlighted');
        el.classList.remove('dimmed');
      } else {
        el.classList.add('dimmed');
        el.classList.remove('highlighted');
      }
    });

    // Inject or restore the focus SVG in the public-policy area
    const focusSrc = key === 'role' ? focusRolesSvg
                   : key === 'bottleneck' ? focusBottleneckSvg
                   : null;

    const svgEl = document.getElementById('outcome-explorer-slide1');
    let cancelled = false;

    if (focusSrc && svgEl) {
      // Hide the original policy components
      POLICY_COMPONENTS.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.visibility = 'hidden';
      });

      const existingOverlay = document.getElementById(FOCUS_OVERLAY_ID);

      // Highlight the active sub-step inside whichever overlay is showing
      if (existingOverlay) {
        existingOverlay.querySelectorAll('g[id]').forEach(g => {
          if (!g.id.startsWith('role_') && !g.id.startsWith('bottleneck_')) return;
          const isActive = g.id === selectedItem;
          g.style.opacity = isActive ? '1' : '0.35';
          const mainPath = g.querySelector('path');
          if (mainPath) {
            mainPath.style.fill = isActive
              ? (g.id.startsWith('role_') ? '#d64c64' : '#3a80ac')
              : '';
          }
          g.querySelectorAll('text, tspan').forEach(t => {
            t.style.fill = isActive ? '#ffffff' : '';
          });
        });
      }

      // Skip re-fetching if the same source is already injected
      if (!existingOverlay || existingOverlay.dataset.src !== focusSrc) {
        if (existingOverlay) existingOverlay.remove();

        fetch(focusSrc)
          .then(r => r.text())
          .then(svgText => {
            if (cancelled) return;
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgText, 'image/svg+xml');
            const innerSvg = doc.querySelector('svg');
            const host = document.getElementById('outcome-explorer-slide1');
            if (!innerSvg || !host) return;

            // Both focus SVGs are 936×936; scale uniformly, then apply tweaks
            const svgSize = 936;
            const SIZE_MULTIPLIER = 1.3;   // wheel size relative to bbox fit
            const VERTICAL_SHIFT  = 3300;  // extra downward nudge in SVG units

            const targetW = parseInt(POLICY_BBOX.width);
            const targetH = parseInt(POLICY_BBOX.height);
            const baseScale  = Math.min(targetW / svgSize, targetH / svgSize);
            const scale      = baseScale * SIZE_MULTIPLIER;
            const scaledSize = Math.round(svgSize * scale);

            // Centre horizontally and vertically within the bbox, then shift down
            const tx = parseInt(POLICY_BBOX.x) + Math.round((targetW - scaledSize) / 2);
            const ty = parseInt(POLICY_BBOX.y) + Math.round((targetH - scaledSize) / 2) + VERTICAL_SHIFT;

            // Create a nested <svg> — it has its own viewport and scoped defs
            const nestedSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            nestedSvg.setAttribute('id', FOCUS_OVERLAY_ID);
            nestedSvg.dataset.src = focusSrc;
            nestedSvg.setAttribute('x', String(tx));
            nestedSvg.setAttribute('y', String(ty));
            nestedSvg.setAttribute('width', String(scaledSize));
            nestedSvg.setAttribute('height', String(scaledSize));
            nestedSvg.setAttribute('viewBox', '0 0 936 936');

            // Inline all children (defs + shapes) from the parsed SVG
            Array.from(innerSvg.childNodes).forEach(child => {
              nestedSvg.appendChild(child.cloneNode(true));
            });

            host.appendChild(nestedSvg);

            // Apply initial highlight for the active sub-step
            nestedSvg.querySelectorAll('g[id]').forEach(g => {
              if (!g.id.startsWith('role_') && !g.id.startsWith('bottleneck_')) return;
              const isActive = g.id === selectedItem;
              g.style.opacity = isActive ? '1' : '0.35';
              const mainPath = g.querySelector('path');
              if (mainPath) {
                mainPath.style.fill = isActive
                  ? (g.id.startsWith('role_') ? '#d64c64' : '#3a80ac')
                  : '';
              }
              g.querySelectorAll('text, tspan').forEach(t => {
                t.style.fill = isActive ? '#ffffff' : '';
              });
            });

            // Make role_* / bottleneck_* groups clickable
            nestedSvg.style.cursor = 'pointer';
            nestedSvg.addEventListener('click', (e) => {
              const target = e.target.closest('g[id]');
              if (!target) return;
              const id = target.id;
              if (id.startsWith('role_') || id.startsWith('bottleneck_')) {
                setSelectedItem(id);
                if (contentRef.current) {
                  contentRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }
            });
          });
      }
    } else {
      // Restore original policy components and remove any overlay
      POLICY_COMPONENTS.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.visibility = '';
      });
      const existingOverlay = document.getElementById(FOCUS_OVERLAY_ID);
      if (existingOverlay) existingOverlay.remove();
    }

    return () => { cancelled = true; };
  }, [selectedItem]);


    return (
        <Container fluid style={{ flex: 1, minHeight: 0, padding: 0, overflow: 'hidden' }} className="d-flex flex-column">
            <ProgressIndicator selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            <Row className="flex-grow-1" style={{ minHeight: 0, height: '100%' }}>
                {/* Sidebar Column */}
                <Col xs={12} md={4} lg={4}
                    className="bg-paper d-flex flex-column"
                    style={{ height: '100%', overflow: 'hidden' }}
                    >
                    {selectedItem === 'closure' ? (
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                        <img
                          src={ClosureTrianglePng}
                          alt="Reform triangle diagram"
                          style={{ width: '100%', objectFit: 'contain' }}
                        />
                      </div>
                    ) : (
                      <VerticalNavImg
                        style={{
                          flex: 1,
                          width: '100%',
                          display: 'block',
                        }}
                      />
                    )}

                </Col>
                <Col xs={12} md={8} lg={8} style={{ height: '100%', overflowY: 'auto' }}>
                  <Content contentRef={contentRef} outcome={outcome} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                </Col>
            </Row>
        </Container>
    );
}

export default VerticalNavbarPermanent;
