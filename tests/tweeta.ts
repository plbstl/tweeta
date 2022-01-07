import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Tweeta } from '../target/types/tweeta';

describe('tweeta', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Tweeta as Program<Tweeta>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
